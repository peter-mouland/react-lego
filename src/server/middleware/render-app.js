import React from 'react';
import { renderToString } from 'react-dom/server';

function renderPageToString(page) {
  return `<!doctype html>${renderToString(page)}`;
}

const Html = ({ initialState, scripts, stylesheets, markup }) => (
  <html lang="en">
    <head>
      <meta charSet="utf-8" />
      <meta httpEquiv="x-dns-prefetch-control" content="on" />
      <meta name="viewport" content="width=device-width,initial-scale=1.0" />
    </head>
    <body>
    <script dangerouslySetInnerHTML={{
      __html: `window.__APOLLO_STATE__ = ${JSON.stringify(initialState)}`
    }} />
    <div id="stylesheets" dangerouslySetInnerHTML={{ __html: stylesheets.join('') }} />
    <div id="html" dangerouslySetInnerHTML={{ __html: markup }} />
    <div id="scripts" dangerouslySetInnerHTML={{ __html: scripts.join('') }} />
    </body>
  </html>
)

export default function renderApp(assets) {
  return async (ctx, next) => {
    await next();
    try {
      ctx.body = renderPageToString(<Html
          initialState={ctx.initialState}
          scripts={assets.javascript}
          stylesheets={assets.styles}
          markup={ctx.markup}
        />);
    } catch (error) {
      console.log(error)
      ctx.response.status = 500;
      ctx.body = renderPageToString(<div>Crikey!</div>);
    }
  };
}
