import React, { Component, PropTypes } from 'react';
import DocumentMeta from 'react-document-meta';

import { findRoute } from '../utils';
import { routes, LinkHelper } from '../routes';

export default class MainLayout extends Component {

  static propTypes = {
    location: PropTypes.object
  };

  render() {
    const { children, location } = this.props;
    const cfg = findRoute(location.pathname);
    const route = cfg || routes.homepage;
    const navLinkProps = {
      className: 'layout__nav-link',
      activeClassName: 'layout__nav-link--selected'
    };

    return (
      <div className="layout layout--main">
        <DocumentMeta title={ route.title } />
        <nav className="layout__nav">
          <span className="layout__nav-header">React Lego</span>
          <LinkHelper to='homepage' { ...navLinkProps } />
          <LinkHelper to="game" { ...navLinkProps } />
        </nav>
        <div className="layout__content">
          {children}
        </div>
        <footer className="layout__footer">
          Hosted at <a href="http://github.com/peter-mouland/react-lego">github.com/peter-mouland/react-lego</a>
        </footer>
      </div>
    );
  }
}
