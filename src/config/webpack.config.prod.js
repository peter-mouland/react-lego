const webpack = require('webpack'); // eslint-disable-line no-unused-vars

const { SRC } = require('./paths');
const defaultConfig = require('./webpack.common');


const prodConfig = Object.assign({}, defaultConfig, {
  entry: { app: [`${SRC}/styles/app.scss`, `${SRC}/client-entry.js`] }
});

module.exports = prodConfig;
