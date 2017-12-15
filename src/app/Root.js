/* global window */
import React from 'react';
import BrowserRouter from 'react-router-dom/BrowserRouter';
import StaticRouter from 'react-router-dom/StaticRouter';
import { ApolloClient } from 'apollo-client';
import { withClientState } from 'apollo-link-state';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from 'react-apollo';
import debug from 'debug';

import schema from './schema/schema';
import { makeRoutes } from './routes';
import { isBrowser } from './utils';

debug('lego:Root');

const client = new ApolloClient({
  link: withClientState(schema),
  cache: new InMemoryCache(isBrowser ? window.__APOLLO_STATE__ : {}), // eslint-disable-line no-underscore-dangle, max-len
});

// exported to be used in tests
export const Router = isBrowser ? BrowserRouter : StaticRouter;

export default class Root extends React.Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Router {...this.props} >
          {makeRoutes()}
        </Router>
      </ApolloProvider>
    );
  }
}
