import React from 'react';
import BrowserRouter from 'react-router-dom/BrowserRouter';
import MemoryRouter from 'react-router-dom/MemoryRouter';
import debug from 'debug';

import { makeRoutes } from './routes';
import { isBrowser } from './utils';

debug('lego:Root');

// exported to be used in tests
export const Router = isBrowser ? BrowserRouter : MemoryRouter;

export default class Root extends React.Component {
  render() {
    return (
      <Router {...this.props} >
        {makeRoutes()}
      </Router>
    );
  }
}
