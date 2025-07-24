import * as dotenv from 'dotenv';
import { app, BrowserWindow } from 'electron';
import path from 'path';
import { isDev } from './util.js';

dotenv.config({ path: '.env.local' });

app.on('ready', () => {
  const mainWindow = new BrowserWindow();
  mainWindow.loadFile(path.join(app.getAppPath() + '/dist-react/index.html'));

  if (isDev()) {
    mainWindow.loadURL(process.env.VITE_URL || 'http://localhost:5123');
  } else {
    mainWindow.loadFile(path.join(app.getAppPath() + '/dist-react/index.html'));
  }
});
