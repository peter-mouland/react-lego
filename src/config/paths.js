const path = require('path'); // eslint-disable-line

const ROOT = path.join(__dirname, '../..');
const SRC = path.join(ROOT, 'src');
const DIST = path.join(ROOT, 'dist');
const COMPILED = path.join(ROOT, 'compiled');
const APP = path.join(SRC, 'app');
const SERVER = path.join(SRC, 'server');
const PUBLIC = path.join(SERVER, 'public');
const ICONS = path.join(SRC, 'icons');
const STYLES = path.join(SRC, 'styles');
const TESTS = path.join(ROOT, 'tests');
const ASSET_FILE = path.join(SERVER, 'webpack-assets.json');

module.exports = { ROOT, SRC, DIST, COMPILED, APP, ICONS, PUBLIC, STYLES, TESTS, ASSET_FILE };
