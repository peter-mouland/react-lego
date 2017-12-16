import React from 'react';
import { renderToString } from 'react-dom/server';
import StaticRouter from 'react-router-dom/StaticRouter';
import matchPath from 'react-router-dom/matchPath';
import { ApolloProvider, getDataFromTree, renderToStringWithData } from 'react-apollo';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
// import { createHttpLink } from 'apollo-link-http';
// import { SchemaLink } from 'apollo-link-schema';
import { withClientState } from 'apollo-link-state';

import { makeRoutes, getRoutesConfig } from '../../app/routes';
import schema from '../../app/schema/schema';

// const GRAPHQL_ENDPOINT = process.env.GRAPHQL_ENDPOINT || '' // 'graphql';
// const GRAPHQL_PORT = process.env.GRAPHQL_PORT || 3000;
// const HOST = process.env.HOST || 'http://localhost';
// const apiUrl = `${HOST}:${GRAPHQL_PORT}/${GRAPHQL_ENDPOINT}`;

const createClient = ({ request, headers }) => new ApolloClient({
  ssrMode: true,
  link: withClientState({ schema }),
  // link: createHttpLink({
  //   uri: apiUrl,
  //   credentials: 'same-origin',
  //   headers,
  // }),
  cache: new InMemoryCache(),
});

function getMatch(routesArray, url) {
  return routesArray
    .find((route) => matchPath(url, { path: route.path, exact: true, strict: false }));
}

const Markup = ({ req, context, client }) => (
  <ApolloProvider client={client}>
    <StaticRouter location={req.url} context={ context }>
      {makeRoutes()}
    </StaticRouter>
  </ApolloProvider>
);

function setRouterContext() {
  const routesArray = getRoutesConfig();
  return async (ctx, next) => {
    const client = createClient(ctx)
    const routerContext = {};
    const App = Markup({ req: ctx.request, context: routerContext, client });

    // await getDataFromTree(App)
    await renderToStringWithData(App)
      .then((markup) => {
        // We are ready to render for real
        // const markup = renderToString(App);
        const match = getMatch(routesArray, ctx.request.url);
        if (routerContext.url) {
          ctx.status = 301;
          ctx.redirect(routerContext.location.pathname + routerContext.location.search);
        } else {
          ctx.initialState = client.extract();
          ctx.status = match ? 200 : 404;
          ctx.markup = markup;
        }
      })
      .catch((error) => console.log(error))
    await next();
  };
}


export default setRouterContext;
