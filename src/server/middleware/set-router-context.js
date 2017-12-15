import React from 'react';
import { renderToString } from 'react-dom/server';
import StaticRouter from 'react-router-dom/StaticRouter';
import matchPath from 'react-router-dom/matchPath';

import { makeRoutes, getRoutesConfig } from '../../app/routes';

function getMatch(routesArray, url) {
  return routesArray
    .find((route) => matchPath(url, { path: route.path, exact: true, strict: false }));
}

const Markup = ({ req, context }) => (
  <StaticRouter location={req.url} context={ context }>
    {makeRoutes()}
  </StaticRouter>
);

function setRouterContext() {
  const routesArray = getRoutesConfig();
  return async (ctx, next) => {
    const routerContext = {};
    const markup = renderToString(Markup({ req: ctx.request, context: routerContext }));
    const match = getMatch(routesArray, ctx.request.url);
    if (routerContext.url) {
      ctx.status = 301;
      ctx.redirect(routerContext.location.pathname + routerContext.location.search);
    } else {
      ctx.status = match ? 200 : 404;
      ctx.markup = markup;
    }
    await next();
  };
}

export default setRouterContext;
