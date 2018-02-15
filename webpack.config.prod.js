const webpack = require('webpack');
const Visualizer = require('webpack-visualizer-plugin');

require('./src/config/environment');
const { SRC } = require('./src/config/paths');
const defaultConfig = require('./webpack.common');

const prodConfig = Object.assign({}, defaultConfig, {
  mode: 'production',
  entry: {
    app: [`${SRC}/styles/app.scss`, `${SRC}/client-entry.jsx`],
    polyfills: [`${SRC}/polyfills.js`]
  }
});

prodConfig.plugins.unshift(new webpack.HashedModuleIdsPlugin());
prodConfig.plugins.unshift(new Visualizer({ filename: '../webpack-stats.html' }));

module.exports = prodConfig;
