/* eslint-disable */
require('babel-polyfill');
require('./config/environment');
require('./server/utils/assets-helper');

const mapWebpackAssets = require('./server/utils/mapWebpackAssets');

const webpackAssets = require('../compiled/webpack-assets.json');
const createServer = require('./server/server');
const assets = mapWebpackAssets(webpackAssets);
createServer(assets).listen(process.env.PORT, () => {
  console.log(`listening at http://localhost:${process.env.PORT}`);
})
