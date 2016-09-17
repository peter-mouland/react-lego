import React from 'react';
import { renderToString } from 'react-dom/server';
import express from 'express';
import debug from 'debug';
import compression from 'compression';
import Error500 from './templates/Error500';
import { routingApp, setRoutes } from './router';
import webpackConfig from '../config/webpack.config.prod';

const webpackEntries = Object.keys(webpackConfig.entry);
const assets = {
  javascript: webpackEntries.map((entry) => `/${entry}.js`),
  styles: webpackEntries.map((entry) => `/${entry}.css`)
};
const server = express();
const log = debug('lego:server.js');
log('starting');

server.set('etag', true);
server.use((req, res, next) => {
  res.header('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.header('Pragma', 'no-cache');
  res.header('Expires', 0);
  next();
});
server.use(compression());
server.enable('view cache');
server.enable('strict routing');

Object.assign(express.response, {
  renderPageToString(page) {
    return `<!doctype html>${renderToString(page)}`;
  },
  render500(e) {
    log('render500', e);
    this.status(500).send(this.renderPageToString(<Error500 />));
  }
});

setRoutes(assets);
server.use('/', routingApp);

export default server;
