import React from 'react';
import ReactDOM from 'react-dom';
import { Router, browserHistory, createMemoryHistory } from 'react-router';
import { makeRoutes } from './app/routes';
import { isBrowser } from './app/utils';
import debug from 'debug';

import './styles/app.scss';

debug.enable(process.env.DEBUG);
const log = debug('lego:client-entry');
log('Client environment', process.env);

// exported to be used in tests
export const history = isBrowser ? browserHistory : createMemoryHistory();
export const router = <Router children={makeRoutes()} history={history} />;

try {
  ReactDOM.render(router, document.getElementById('html'));
} catch (err) {
  log('Render error', err);
}
