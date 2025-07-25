import path from 'path';
import { isDev } from './util.js';

export function getPreloadPath() {
  return isDev()
    ? path.resolve('dist-electron/preload.cjs')
    : path.join(process.resourcesPath, 'preload.cjs');
}
