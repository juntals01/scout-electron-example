import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electronAPI', {
  checkMicrophonePermission: () =>
    ipcRenderer.invoke('check-microphone-permission'),
  checkCameraPermission: () => ipcRenderer.invoke('check-camera-permission'),
});

contextBridge.exposeInMainWorld('electronEnv', {
  isDev: process.env.ELECTRON_IS_DEV === 'true',
});
