import React from 'react';
import { renderToString } from 'react-dom/server';
import StaticRouter from 'react-router-dom/StaticRouter';
import matchPath from 'react-router-dom/matchPath';
import { Provider } from 'react-redux';
import url from 'url';

import { searchQueryToJson } from '../../app/utils';
import configureStore from '../../app/store/configure-store';
import { makeRoutes, getRoutesConfig } from '../../app/routes';

function getMatch(routesArray, path) {
  return routesArray
    .find((route) => matchPath(path, { path: route.path, exact: true, strict: false }));
}

async function getRouteData(routesArray, req, dispatch) {
  const path = url.parse(req.url);
  const searchObj = searchQueryToJson(path.search);

  const needs = [];
  routesArray
    .filter((route) => route.component.needs)
    .forEach((route) => {
      const match = matchPath(path.pathname, { path: route.path, exact: true, strict: false });
      if (match) {
        route.component.needs.forEach((need) => {
          const result = need({ ...match.params, ...searchObj });
          needs.push(dispatch(result));
        });
      }
    });
  await Promise.all(needs);
}


const Markup = ({ req, store, context }) => (
  <Provider store={store}>
    <StaticRouter location={req.url} context={ context }>
      {makeRoutes()}
    </StaticRouter>
  </Provider>
);

function setRouterContext() {
  const routesArray = getRoutesConfig();
  return async (ctx, next) => {
    const store = configureStore();
    const routerContext = {};
    await getRouteData(routesArray, ctx.request, store.dispatch);
    const markup = renderToString(Markup({ req: ctx.request, store, context: routerContext }));
    const match = getMatch(routesArray, ctx.request.url);
    if (routerContext.url) {
      ctx.status = 301;
      ctx.redirect(routerContext.location.pathname + routerContext.location.search);
    } else {
      ctx.initialState = store.getState();
      ctx.status = match ? 200 : 404;
      ctx.markup = markup;
    }
    await next();
  };
}

export default setRouterContext;
