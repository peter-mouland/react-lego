import React from 'react';
import bemHelper from 'react-bem-helper';
import debug from 'debug';

import { NamedLink } from '../routes';

import './mainLayout.scss';

const log = debug('base:mainLayout');

export default class MainLayout extends React.Component {

  render() {
    const bem = bemHelper({ name: 'layout' });
    const { children } = this.props;

    return (
      <div {...bem(null, 'main')}>
        <nav {...bem('nav')}>
          <span {...bem('nav', 'header')}>React SSR Base</span>
          <NamedLink to='homepage' {...bem('nav', 'link')} />
        </nav>
        <main {...bem('content')}>
          {children}
        </main>
        <footer {...bem('footer')}>
          Hosted at <a href="http://github.com/peter-mouland/react-lego">github.com/peter-mouland/react-lego</a>
        </footer>
      </div>
    );
  }
}
