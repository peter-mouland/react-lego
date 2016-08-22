import ReactDOM from 'react-dom';
import Root from './app/Root';
import debug from 'debug';

import './styles/app.scss';

debug.enable(process.env.DEBUG);

const log = debug('lego:client-entry');
log('Client environment', process.env);

try {
  ReactDOM.render(Root, document.getElementById('html'));
} catch (err) {
  log('Render error', err);
}
