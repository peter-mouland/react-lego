import Router from 'koa-router';
import koaStatic from 'koa-static';
import debug from 'debug';

import setRouterContext from './middleware/set-router-context';
import renderApp from './middleware/render-app';
import apiRouter from './api';
import { DIST } from '../config/paths';

const log = debug('base:router');
export const router = new Router();

const staticRoute = koaStatic(DIST);
staticRoute._name = 'koaStatic /dist'; // eslint-disable-line no-underscore-dangle

export function setRoutes(assets) {
  log('adding react routes');

  router
    .use(staticRoute)
    .use(apiRouter.routes())
    .use(apiRouter.allowedMethods())
    .use(setRouterContext())
    .get('/(.*)', renderApp(assets));
}
