const webpack = require('webpack');

require('./environment');
const { SRC } = require('./paths');
const defaultConfig = require('./webpack.common');

const devConfig = Object.assign({}, defaultConfig, {
  entry: {
    app: [`${SRC}/client-entry.js`],
    'promise-polyfill': [`${SRC}/promise-polyfill.js`]
  }
});

devConfig.plugins.unshift(new webpack.HotModuleReplacementPlugin());

module.exports = devConfig;
