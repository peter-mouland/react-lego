const { SRC } = require('./src/config/paths');
const defaultConfig = require('./webpack.common');

const devConfig = Object.assign({}, defaultConfig, {
  mode: 'development',
  entry: {
    app: [`${SRC}/styles/app.scss`, `${SRC}/client-entry.jsx`],
    polyfills: [`${SRC}/polyfills.js`]
  },
  serve: {
    dev: {
      publicPath: '/dist/'
    }
  }
});


module.exports = devConfig;
