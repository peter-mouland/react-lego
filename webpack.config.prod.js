require('./src/config/environment');
const { SRC } = require('./src/config/paths');
const defaultConfig = require('./webpack.common');

const prodConfig = Object.assign({}, defaultConfig, {
  mode: 'production',
  entry: {
    app: [`${SRC}/styles/app.scss`, `${SRC}/client-entry.js`],
    polyfills: [`${SRC}/polyfills.js`]
  }
});

module.exports = prodConfig;
