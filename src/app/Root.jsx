import React from 'react';
import BrowserRouter from 'react-router-dom/BrowserRouter';
import StaticRouter from 'react-router-dom/StaticRouter';
import debug from 'debug';

import { makeRoutes } from './routes';
import { isBrowser } from './utils';

debug('lego:Root');

// exported to be used in tests
export const Router = isBrowser ? BrowserRouter : StaticRouter;

export default (props) => (
  <Router {...props} >
    {makeRoutes()}
  </Router>
);
