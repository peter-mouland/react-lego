/* global window */
import React from 'react';
import { ApolloClient } from 'apollo-client';
import { withClientState } from 'apollo-link-state';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from 'react-apollo';

import Homepage from './containers/Homepage/Homepage';
import schema from './schema/schema';
import { isBrowser } from './utils';

const client = new ApolloClient({
  link: withClientState(schema),
  cache: new InMemoryCache(isBrowser ? window.__APOLLO_STATE__ : {}), // eslint-disable-line no-underscore-dangle, max-len
});

// exported to be used in tests

export default class Root extends React.Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Homepage />
      </ApolloProvider>
    );
  }
}
