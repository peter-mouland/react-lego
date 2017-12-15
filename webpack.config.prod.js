require('./src/config/environment');
const defaultConfig = require('./webpack.common');

const prodConfig = Object.assign({}, defaultConfig, {
  mode: 'production',
});

module.exports = prodConfig;
