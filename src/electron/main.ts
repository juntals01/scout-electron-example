import * as dotenv from 'dotenv';
import {
  app,
  BrowserWindow,
  ipcMain,
  shell,
  systemPreferences,
} from 'electron';
import path from 'path';
import { getPreloadPath } from './pathResolver.js';
import { isDev } from './util.js';

dotenv.config({ path: '.env.local' });

// ✅ Enable media and speech APIs for Electron dev window
app.commandLine.appendSwitch('enable-media-stream');
app.commandLine.appendSwitch('enable-speech-api'); // <- required for Web Speech
app.commandLine.appendSwitch('enable-speech-dispatcher'); // <- improves compatibility (Linux)

// 🔐 Handle permission requests from the renderer (mic/camera)
ipcMain.handle('check-microphone-permission', async () => {
  const hasPermission =
    systemPreferences.getMediaAccessStatus('microphone') === 'granted';
  if (hasPermission) return true;

  if (process.platform === 'darwin') {
    const granted = await systemPreferences.askForMediaAccess('microphone');
    if (!granted) {
      shell.openExternal(
        'x-apple.systempreferences:com.apple.preference.security?Privacy_Microphone'
      );
    }
    return granted;
  } else if (process.platform === 'win32') {
    shell.openExternal('ms-settings:privacy-microphone');
  }

  return false;
});

ipcMain.handle('check-camera-permission', async () => {
  const hasPermission =
    systemPreferences.getMediaAccessStatus('camera') === 'granted';
  if (hasPermission) return true;

  if (process.platform === 'darwin') {
    const granted = await systemPreferences.askForMediaAccess('camera');
    if (!granted) {
      shell.openExternal(
        'x-apple.systempreferences:com.apple.preference.security?Privacy_Camera'
      );
    }
    return granted;
  } else if (process.platform === 'win32') {
    shell.openExternal('ms-settings:privacy-webcam');
  }

  return false;
});

app.on('web-contents-created', (_event, contents) => {
  contents.session.setPermissionRequestHandler(
    (webContents, permission, callback) => {
      if (permission === 'media') {
        callback(true); // ✅ Allow mic/camera
      } else {
        callback(false);
      }
    }
  );
});

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
      sandbox: false, // ✅ Optional: can help with mic/cam access in Electron dev
    },
  });

  if (isDev()) {
    mainWindow.loadURL(process.env.VITE_URL || 'http://localhost:5123');
  } else {
    mainWindow.loadFile(path.join(app.getAppPath(), '/dist-react/index.html'));
  }
});
