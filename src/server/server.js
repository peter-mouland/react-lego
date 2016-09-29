/* eslint-disable no-console,import/no-extraneous-dependencies */

const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const express = require('express');
const path = require('path');
const httpProxy = require('http-proxy');

require('../config/environment');
const webpackConfig = require('../config/webpack.config.dev.js');

const proxy = httpProxy.createProxyServer();
const app = express();
let bundleStart = null;
const compiler = webpack(webpackConfig);
compiler.plugin('compile', () => {
  console.log('Bundling...');
  bundleStart = Date.now();
});
compiler.plugin('done', () => {
  console.log(`Bundled in ${Date.now() - bundleStart}ms!`);
});

const bundler = new WebpackDevServer(compiler, {
  publicPath: '/dist/',
  hot: true,
  quiet: false,
  noInfo: true,
  stats: {
    colors: true
  }
});

app.use(express.static(path.resolve(__dirname, 'dist')));

app.all('/dist/*', (req, res) => {
  proxy.web(req, res, {
    target: 'http://localhost:8080'
  });
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'views/index.html'));
});

module.exports = { app, bundler, compiler };
