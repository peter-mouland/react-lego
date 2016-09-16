const webpack = require('webpack');

const { SRC } = require('./paths');
const defaultConfig = require('./webpack.common');

defaultConfig.plugins.concat([
  new webpack.optimize.UglifyJsPlugin({ minimize: true })
]);

const prodConfig = Object.assign({}, defaultConfig, {
  entry: { app: [`${SRC}/client-entry.js`] }
});

module.exports = prodConfig;
