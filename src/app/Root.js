import React from 'react';
import { Router, browserHistory, createMemoryHistory } from 'react-router';

import { makeRoutes } from './routes';
import { isBrowser } from './utils';
import debug from 'debug';

debug('lego:Root');

// exported to be used in tests
export const history = isBrowser ? browserHistory : createMemoryHistory();

export default class Root extends React.Component {
  render() {
    return <Router children={makeRoutes()} history={history} />;
  }
}
