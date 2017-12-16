import Koa from 'koa';

import { router, setRoutes } from './router';

const server = new Koa();

export default (assets) => {
  setRoutes(assets);
  server.use(router.routes());
  return server;
};
