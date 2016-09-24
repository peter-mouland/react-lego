import React from 'react';
import ReactDOM from 'react-dom';
import debug from 'debug';

import Root from './app/Root';

debug.enable(process.env.DEBUG);

const log = debug('lego:client-entry');
log('Client environment', process.env);

try {
  ReactDOM.render(<Root />, document.getElementById('html'));
} catch (err) {
  log('Render error', err);
}
