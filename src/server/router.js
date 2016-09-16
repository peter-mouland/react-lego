import setRouterContext from './middleware/set-router-context';
import renderApp from './middleware/render-app';
import express from 'express';
import debug from 'debug';
import slashes from 'connect-slashes';

import apiRouter from './api';

const log = debug('lego:router');
const oneDay = 1000 * 60 * 60 * 24;
import { DIST, PUBLIC } from '../config/paths';

export const routingApp = express();

routingApp.on('mount', (parent) => {
  parent.use((err, req, res, next) => (
    (err) ? res.render500(err) : next()
  ));
});

export function setRoutes(assets) {
  log('adding react routes');

  routingApp
    .use('/', express.static(DIST, { maxAge: oneDay }))
    .use('/', express.static(PUBLIC, { maxAge: oneDay }))
    .use('/api', apiRouter)
    .use(slashes())
    .get('*', setRouterContext, renderApp(assets));
}
