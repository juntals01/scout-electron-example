import * as dotenv from 'dotenv';
import { app, BrowserWindow } from 'electron';
import path from 'path';
import { isDev } from './util.js';

dotenv.config({ path: '.env.local' });

// 👇 Allow media input (mic access)
app.commandLine.appendSwitch('enable-media-stream');

app.on('web-contents-created', (_event, contents) => {
  contents.session.setPermissionRequestHandler(
    (webContents, permission, callback) => {
      if (permission === 'media') {
        callback(true); // allow mic
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
      nodeIntegration: true,
      contextIsolation: false,
      sandbox: false,
      webSecurity: false,
    },
  });

  if (isDev()) {
    mainWindow.loadURL(process.env.VITE_URL || 'http://localhost:5123');
  } else {
    mainWindow.loadFile(path.join(app.getAppPath(), '/dist-react/index.html'));
  }
});
