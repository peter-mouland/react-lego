/* eslint-disable */
require('babel-polyfill');
require('./config/environment');
const webpackAssets = require('../compiled/webpack-assets.json');
const mapWebpackAssets = require('./server/utils/mapWebpackAssets');

const assets = mapWebpackAssets(webpackAssets);
const createServer = require('./server/server');

createServer(assets).listen(process.env.PORT, () => {
  console.log(`listening at http://localhost:${process.env.PORT}`);
});
