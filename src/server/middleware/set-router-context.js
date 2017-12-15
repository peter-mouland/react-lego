import React from 'react';
import { renderToString } from 'react-dom/server';
import StaticRouter from 'react-router-dom/StaticRouter';
import matchPath from 'react-router-dom/matchPath';
import { ApolloProvider } from 'react-apollo';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { SchemaLink } from 'apollo-link-schema';

import { makeRoutes, getRoutesConfig } from '../../app/routes';
import schema from '../../app/schema/schema';

const client = new ApolloClient({
  ssrMode: true,
  link: new SchemaLink({ schema }),
  cache: new InMemoryCache(),
});

function getMatch(routesArray, url) {
  return routesArray
    .find((route) => matchPath(url, { path: route.path, exact: true, strict: false }));
}

const Markup = ({ req, context }) => (
  <ApolloProvider client={client}>
    <StaticRouter location={req.url} context={ context }>
      {makeRoutes()}
    </StaticRouter>
  </ApolloProvider>
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
      ctx.initialState = client.extract();
      ctx.status = match ? 200 : 404;
      ctx.markup = markup;
    }
    await next();
  };
}

export default setRouterContext;
