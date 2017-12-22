import React from 'react';
import PropTypes from 'prop-types';
import debug from 'debug';

import bemHelper from '../utils/bem';
import { NamedLink } from '../routes';

import './mainLayout.scss';

const log = debug('base:mainLayout');
const cn = bemHelper({ block: 'layout' });

const MainLayout = ({ children }) => (
  <div className={cn(null, 'main')}>
    <nav className={cn('nav')}>
      <span className={cn('nav', 'header')}>React SSR Base</span>
      <NamedLink to="homepage" className={cn('nav', 'link')} />
      <NamedLink to="game" className={cn('nav', 'link')} />
    </nav>
    <main className={cn('content')}>
      {children}
    </main>
    <footer className={cn('footer')}>
      Hosted at <a href="http://github.com/peter-mouland/react-lego">github.com/peter-mouland/react-lego</a>
    </footer>
  </div>
);

MainLayout.propTypes = {
  children: PropTypes.element.isRequired
};

export default MainLayout;
