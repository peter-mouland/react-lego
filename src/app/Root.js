import { h, Component } from 'preact';
import debug from 'debug';

import { makeRoutes } from './routes';

debug('lego:Root');

export default class Root extends Component {
  render() {
    return (
      <div >
        {makeRoutes()}
      </div>
    );
  }
}
