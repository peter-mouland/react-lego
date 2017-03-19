require('./environment');
const { SRC } = require('./paths');
const defaultConfig = require('./webpack.common');

const prodConfig = Object.assign({}, defaultConfig, {
  entry: {
    app: [`${SRC}/client-entry.js`],
    'promise-polyfill': [`${SRC}/promise-polyfill.js`]
  }
});

module.exports = prodConfig;
