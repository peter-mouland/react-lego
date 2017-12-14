const webpack = require('webpack');

const config = require('./src/config/environment');
const { SRC } = require('./src/config/paths');
const defaultConfig = require('./webpack.common');

const devConfig = Object.assign({}, defaultConfig, {
  mode: 'development',
  entry: {
    app: [`webpack-dev-server/client?http://localhost:${config.PORT}/`, `${SRC}/styles/app.scss`, `${SRC}/client-entry.js`],
    polyfills: [`${SRC}/polyfills.js`]
  }
});

devConfig.plugins.unshift(new webpack.HotModuleReplacementPlugin());

module.exports = devConfig;
