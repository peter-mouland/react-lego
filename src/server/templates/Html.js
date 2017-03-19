import React, { PropTypes } from 'react';
import DocumentMeta from 'react-document-meta';
import { hasWindow } from '../../app/utils';

export default class Html extends React.Component {
  static propTypes = {
    content: PropTypes.node,
    script: PropTypes.string,
    stylesheet: PropTypes.string
  };

  render() {
    const { initialState, scripts, stylesheets, markup } = this.props;
    return (
      <html lang="en">
      <head>
        <meta charSet="utf-8" />
        {hasWindow ? null : DocumentMeta.renderAsReact()}
        <meta httpEquiv="x-dns-prefetch-control" content="on" />
        <meta name="viewport" content="width=device-width,initial-scale=1.0" />
        {stylesheets.map((stylesheet, i) => <link href={stylesheet} rel="stylesheet" key={ i } />)}
      </head>
      <body>
      <script dangerouslySetInnerHTML={{
        __html: `window.__INITIAL_STATE__ = ${JSON.stringify(initialState)}`
      }} />
      <div id="html" dangerouslySetInnerHTML={{ __html: markup }} />

      <script dangerouslySetInnerHTML={{ __html: `
        if (!window.location.origin) { // Some browsers (mainly IE) does not have this property
          var local = window.location;
          window.location.origin = local.protocol + '//' + local.hostname + (
          local.port ? (':' + local.port) : ''
          );
        }
          if(!window.Promise) { // synchronously polyfill promises - required for code-splitting
          var req = new XMLHttpRequest();
          req.open('GET', location.origin + '/dist/promise-polyfill.js', false);
          req.send();
          eval(req.responseText);
        }
      ` }} />

      {scripts.map((script, i) => <script src={script} key={ i } />)}
      </body>
      </html>
    );
  }
}
