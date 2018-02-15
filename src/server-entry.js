/* eslint-disable no-console, import/no-extraneous-dependencies */
const Webpack = require('webpack');
const WebpackServer = require('webpack-serve');

const { PORT } = require('./config/environment');
const config = require('../webpack.config.dev.js');
require('./app/polyfills/node-fetch');

const options = { ...config.serve };
delete config.serve;
const compiler = Webpack(config);
options.compiler = compiler;
options.port = PORT;

WebpackServer(options).then((server) => {
  server.on('listening', () => {
    console.log(`Starting server on http://localhost:${PORT}`);
  });
});
