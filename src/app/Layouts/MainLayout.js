import React from 'react';
import bemHelper from 'react-bem-helper';
// import { Link } from 'react-router-dom';
import debug from 'debug';

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
          <a href='/?bookTitle=Dracula-by-Bram-Stoker' {...bem('nav', 'link')} >
            Dracula-by-Bram-Stoker
          </a>
          <a href='/?bookTitle=words' {...bem('nav', 'link')} >
            Gary Provost
          </a>
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
