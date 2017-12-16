import React from 'react';
import { renderToString } from 'react-dom/server';
import Html from '../templates/Html';

function renderPageToString(page) {
  return `<!doctype html>${renderToString(page)}`;
};

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
