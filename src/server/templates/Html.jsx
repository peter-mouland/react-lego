/* eslint-disable react/no-danger */
import React from 'react';
import PropTypes from 'prop-types';
import DocumentMeta from 'react-document-meta';
import { hasWindow } from '../../app/utils';

const Html = ({
  initialState, scripts, stylesheets, markup
}) => (
  <html lang="en">
    <head>
      <meta charSet="utf-8" />
      {hasWindow ? null : DocumentMeta.renderAsReact()}
      <meta httpEquiv="x-dns-prefetch-control" content="on" />
      <meta name="viewport" content="width=device-width,initial-scale=1.0" />
    </head>
    <body>
      <div id="stylesheets" dangerouslySetInnerHTML={{ __html: stylesheets.join('') }} />
      <script dangerouslySetInnerHTML={{
        __html: `window.__INITIAL_STATE__ = ${JSON.stringify(initialState)}`
        }}
      />
      <div id="html" dangerouslySetInnerHTML={{ __html: markup }} />
      <div id="scripts" dangerouslySetInnerHTML={{ __html: scripts.join('') }} />
    </body>
  </html>
);

Html.propTypes = {
  markup: PropTypes.string.isRequired,
  scripts: PropTypes.arrayOf(PropTypes.string).isRequired,
  stylesheets: PropTypes.arrayOf(PropTypes.string).isRequired,
  initialState: PropTypes.object.isRequired // eslint-disable-line react/forbid-prop-types
};

export default Html;
