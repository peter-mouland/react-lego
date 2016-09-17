require('./environment');
const fs = require('fs');
const { SRC, COMPILED } = require('./paths');
const defaultConfig = require('./webpack.common');

const nodeModules = {};

fs.readdirSync('node_modules')
  .filter((module) => ['.bin'].indexOf(module) === -1)
  .forEach((module) => { nodeModules[module] = `commonjs ${module}`; });

const serverConfig = Object.assign({}, defaultConfig, {
  target: 'node',
  externals: nodeModules,
  entry: { server: [`${SRC}/server-entry.js`] }
});

serverConfig.output.path = COMPILED;

module.exports = serverConfig;
