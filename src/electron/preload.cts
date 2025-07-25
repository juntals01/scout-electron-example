import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electronAPI', {
  checkMicrophonePermission: () =>
    ipcRenderer.invoke('check-microphone-permission'),
  checkCameraPermission: () => ipcRenderer.invoke('check-camera-permission'),
  saveTempWav: (buffer: Uint8Array) =>
    ipcRenderer.invoke('save-temp-wav', buffer),
  transcribeAudio: (path: string, language: string) =>
    ipcRenderer.invoke('transcribe-audio', path, language),
});

contextBridge.exposeInMainWorld('electronEnv', {
  isDev: process.env.ELECTRON_IS_DEV === 'true',
});
