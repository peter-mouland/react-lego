require('./environment');
const { SRC } = require('./paths');
const defaultConfig = require('./webpack.common');

const prodConfig = Object.assign({}, defaultConfig, {
  entry: {
    app: [`${SRC}/styles/app.scss`, `${SRC}/client-entry.js`],
    'promise-polyfill': [`${SRC}/promise-polyfill.js`]
  }
});

module.exports = prodConfig;
