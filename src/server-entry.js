/* eslint-disable */
require('./config/environment');
require('./app/polyfills/node-fetch');

function getAssets() {
 // maybe just wait until file exists
 return (process.env.NODE_ENV === 'production')
   ? require('../compiled/webpack-assets.json')
   : {"app":{"js":"/app.js","css":"/app.css"},"polyfills":{"js":"/polyfills.js"}}
}
const webpackAssets = getAssets()
const mapWebpackAssets = require('./server/utils/mapWebpackAssets');

const assets = mapWebpackAssets(webpackAssets);
const createServer = require('./server/server');

createServer(assets).listen(process.env.PORT, () => {
  console.log(`listening at http://localhost:${process.env.PORT}`);
});
