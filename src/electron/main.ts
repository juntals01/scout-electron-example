import { execFile, spawn } from 'child_process';
import * as dotenv from 'dotenv';
import {
  app,
  BrowserWindow,
  ipcMain,
  shell,
  systemPreferences,
} from 'electron';
import ffmpegPath from 'ffmpeg-static';
import { readFile, writeFile } from 'fs/promises';
import { tmpdir } from 'os';
import path from 'path';
import { promisify } from 'util';
import { getPreloadPath, getWhisperPath } from './pathResolver.js';
import { isDev } from './util.js';

dotenv.config({ path: '.env.local' });

app.commandLine.appendSwitch('enable-media-stream');
app.commandLine.appendSwitch('enable-speech-api');
app.commandLine.appendSwitch('enable-speech-dispatcher');

ipcMain.handle('check-microphone-permission', async () => {
  const status = systemPreferences.getMediaAccessStatus('microphone');
  if (status === 'granted') return true;

  if (process.platform === 'darwin') {
    const granted = await systemPreferences.askForMediaAccess('microphone');
    if (!granted) {
      shell.openExternal(
        'x-apple.systempreferences:com.apple.preference.security?Privacy_Microphone'
      );
    }
    return granted;
  }

  if (process.platform === 'win32') {
    shell.openExternal('ms-settings:privacy-microphone');
  }

  return false;
});

ipcMain.handle('check-camera-permission', async () => {
  const status = systemPreferences.getMediaAccessStatus('camera');
  if (status === 'granted') return true;

  if (process.platform === 'darwin') {
    const granted = await systemPreferences.askForMediaAccess('camera');
    if (!granted) {
      shell.openExternal(
        'x-apple.systempreferences:com.apple.preference.security?Privacy_Camera'
      );
    }
    return granted;
  }

  if (process.platform === 'win32') {
    shell.openExternal('ms-settings:privacy-webcam');
  }

  return false;
});

app.on('web-contents-created', (_event, contents) => {
  contents.session.setPermissionRequestHandler((_wc, permission, callback) => {
    callback(permission === 'media');
  });
});

const execFileAsync = promisify(execFile);

ipcMain.handle('save-temp-wav', async (_event, buffer: Uint8Array) => {
  const tempDir = tmpdir();
  const inputPath = path.join(tempDir, `recording-${Date.now()}.webm`);
  const outputPath = inputPath.replace('.webm', '.wav');

  try {
    // Write original webm audio to temp file
    await writeFile(inputPath, Buffer.from(buffer));

    // Convert WebM/Opus to WAV PCM 16-bit mono 16kHz
    await execFileAsync(String(ffmpegPath), [
      '-y',
      '-i',
      inputPath,
      '-acodec',
      'pcm_s16le',
      '-ac',
      '1',
      '-ar',
      '16000',
      outputPath,
    ]);

    return outputPath;
  } catch (err) {
    console.error('❌ Failed to convert to WAV:', err);
    throw new Error('Failed to convert audio to WAV');
  }
});

ipcMain.handle(
  'transcribe-audio',
  async (_event, wavPath: string, language: string) => {
    const whisperBinary = getWhisperPath('whisper');
    const modelPath = getWhisperPath('ggml-base.en.bin');

    const args = [
      wavPath,
      '--model',
      modelPath,
      '--language',
      language || 'en',
      '--output-txt',
    ];

    try {
      await new Promise<void>((resolve, reject) => {
        const child = spawn(whisperBinary, args);

        child.stdout.on('data', (data) => {
          console.log(`[Whisper] ${data}`);
        });

        child.stderr.on('data', (data) => {
          console.error(`[Whisper ERROR] ${data}`);
        });

        child.on('close', (code) => {
          code === 0
            ? resolve()
            : reject(new Error(`Whisper exited with code ${code}`));
        });
      });

      const transcript = await readFile(`${wavPath}.txt`, 'utf-8');
      return transcript.trim();
    } catch (err) {
      console.error('❌ Whisper transcription error:', err);
      return '[Transcription failed]';
    }
  }
);

app.on('ready', () => {
  const mainWindow = new BrowserWindow({
    width: 1280,
    height: 800,
    minWidth: 1280,
    minHeight: 600,
    useContentSize: true,
    resizable: true,
    webPreferences: {
      preload: getPreloadPath(),
      contextIsolation: true,
      sandbox: false,
    },
  });

  if (isDev()) {
    mainWindow.loadURL(process.env.VITE_URL || 'http://localhost:5123');
  } else {
    mainWindow.loadFile(path.join(app.getAppPath(), 'dist-react/index.html'));
  }
});
