import React from 'react';
import ReactDOM from 'react-dom';
import debug from 'debug';

import './config/environment';

import Root from './app/Root';

const log = debug('lego:client-entry');

try {
  ReactDOM.render(<Root />, document.getElementById('html'));

  if (typeof module.hot === 'object') {
    module.hot.accept((err) => {
      if (err) {
        console.error('Cannot apply HMR update.', err); // eslint-disable-line no-console
      }
    });
  }
} catch (err) {
  log('Render error', err);
}

