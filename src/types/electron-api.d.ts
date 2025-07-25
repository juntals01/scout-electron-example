export {};

declare global {
  interface Window {
    electronAPI: {
      saveTempWav: (buffer: Uint8Array) => Promise<string>;
      transcribeAudio: (path: string, language: string) => Promise<string>;
    };
  }
}
