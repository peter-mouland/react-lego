import React from 'react';
import BrowserRouter from 'react-router-dom/BrowserRouter';
import StaticRouter from 'react-router-dom/StaticRouter';
import { Provider } from 'react-redux';
import debug from 'debug';

import { makeRoutes } from './routes';
import { isBrowser } from './utils';
import configureStore from './store/configure-store';

debug('lego:Root');

// exported to be used in tests
export const Router = isBrowser ? BrowserRouter : StaticRouter;
const store = configureStore(window.__INITIAL_STATE__); // eslint-disable-line

export default (props) => (
  <Provider store={store}>
    <Router {...props} >
      {makeRoutes()}
    </Router>
  </Provider>
);
