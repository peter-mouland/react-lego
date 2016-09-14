import React, { PropTypes } from 'react';
import DocumentMeta from 'react-document-meta';
import { hasWindow } from '../../app/utils';

export default class Html extends React.Component {
  static propTypes = {
    initialState: PropTypes.object,
    content: PropTypes.node,
    script: PropTypes.string,
    stylesheet: PropTypes.string
  };

  render() {
    const { initialState, scripts, stylesheets, content } = this.props;
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
      <div id="html" dangerouslySetInnerHTML={{ __html: content }} />
      {scripts.map((script, i) => <script src={script} key={ i } />)}
      </body>
      </html>
    );
  }
}
