import React from 'react';
import ReactDOM from 'react-dom';

import './config/environment';
import Root from './app/Root';

try {
  ReactDOM.render(<Root />, document.getElementById('html'));
} catch (err) {
  console.log('Render error', err);
}
