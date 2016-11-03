const webpack = require('webpack');

const { SRC } = require('./paths');
const defaultConfig = require('./webpack.common');


const prodConfig = Object.assign({}, defaultConfig, {
  entry: { app: [`${SRC}/styles/app.scss`, `${SRC}/client-entry.js`] },
  plugins: defaultConfig.plugins.concat([
    new webpack.optimize.UglifyJsPlugin({ minimize: true })
  ])
});

module.exports = prodConfig;
