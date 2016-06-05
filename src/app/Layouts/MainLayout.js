import React, { Component, PropTypes } from 'react';
import DocumentMeta from 'react-document-meta';
import { findRoute } from '../utils';
import { routes } from '../routes';

import './mainLayout.scss';

export default class MainLayout extends Component {
  static propTypes = {
    location: PropTypes.object
  };

  render() {
    const { children, location } = this.props;
    const cfg = findRoute(location.pathname);
    const route = cfg || routes.homepage;

    return (
      <div className="layout layout--main">
        <DocumentMeta title={ route.title } />
        <nav className="layout__nav">
          nav
        </nav>
        <div className="layout__content">
          {children}
        </div>
        <footer className="layout__footer">
          footer
        </footer>
      </div>
    );
  }
}
