import React from 'react';
import ReactDOM from 'react-dom';
import debug from 'debug';

import './config/environment';
import Root from './app/Root';

import './styles/app.scss';

const log = debug('lego:client-entry');

try {
  ReactDOM.render(<Root />, document.getElementById('html'));
} catch (err) {
  log('Render error', err);
}
