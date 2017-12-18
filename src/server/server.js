import Koa from 'koa';
import Router from 'koa-router';
import koaStatic from 'koa-static';

import setRouterContext from './middleware/set-router-context';
import renderApp from './middleware/render-app';
import apiRouter from './api';
import { DIST } from '../config/paths';

const server = new Koa();
const router = new Router();

const staticRoute = koaStatic(DIST);
staticRoute._name = 'koaStatic /dist'; // eslint-disable-line no-underscore-dangle

export default (assets) => {
  router
    .use(staticRoute)
    .use(apiRouter.routes())
    .use(apiRouter.allowedMethods())
    .use(setRouterContext())
    .get('/(.*)', renderApp(assets));
  server.use(router.routes());
  return server;
};
