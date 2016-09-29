const path = require('path');

const ROOT = path.join(process.cwd());
const SRC = path.join(ROOT, 'src');
const COMPILED = path.join(ROOT, 'compiled');
const DIST = path.join(COMPILED, 'dist');
const APP = path.join(SRC, 'app');
const ICONS = path.join(SRC, 'icons');
const STYLES = path.join(SRC, 'styles');
const TESTS = path.join(ROOT, 'tests');

module.exports = { ROOT, SRC, DIST, COMPILED, APP, ICONS, STYLES, TESTS };
