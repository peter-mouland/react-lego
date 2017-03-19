import React from 'react';
import ReactDOM from 'react-dom';
import debug from 'debug';

import './config/environment';
import './app/polyfills/find'; // for ie 11 support or include these separately in html

import Root from './app/Root';

const log = debug('lego:client-entry');

try {
  ReactDOM.render(<Root />, document.getElementById('html'));
} catch (err) {
  log('Render error', err);
}
