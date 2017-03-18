import Preact, { h } from 'preact';
import debug from 'debug';

import './config/environment';
import './app/polyfills/find'; // for ie 11 support or include these separately in html

import Root from './app/Root';

const log = debug('lego:client-entry');

try {
  Preact.render(<Root />, document.getElementById('html'));
} catch (err) {
  log('Render error', err);
}
