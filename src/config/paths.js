export const path = require('path'); // eslint-disable-line

export const ROOT = path.join(__dirname, '../..');
export const SRC = path.join(ROOT, 'src');
export const DIST = path.join(ROOT, 'dist');
export const APP = path.join(SRC, 'app');
export const SERVER = path.join(SRC, 'server');
export const ICONS = path.join(SRC, 'icons');
export const STYLES = path.join(SRC, 'styles');
export const TESTS = path.join(ROOT, 'tests');
export const ASSET_FILE = path.join(SERVER, 'webpack-assets.json');
