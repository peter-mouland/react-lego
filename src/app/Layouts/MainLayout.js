import { h, Component } from 'preact';
import debug from 'debug';

import { NamedLink } from '../routes';

const log = debug('base:mainLayout');

export default class MainLayout extends Component {

  render({ children, ...props }) {
    return (
      <div className={'layout__main'}>
        <nav className={'layout__nav'}>
          <span className={'layout__nav-header'}>React SSR Base</span>
          <NamedLink to='homepage' className={'layout__nav-link'} />
          <NamedLink to="game" className={'layout__nav-link'} />
        </nav>
        <main className={'layout__content'}>
          {children}
        </main>
        <footer className={'layout__footer'}>
          Hosted at <a href="http://github.com/peter-mouland/react-lego">github.com/peter-mouland/react-lego</a>
        </footer>
      </div>
    );
  }
}
