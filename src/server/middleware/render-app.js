import React from 'react';
import Html from '../templates/Html';

export default function renderAppWrapper(assets) {
  return function renderApp(req, res) {
    try {
      res.send(res.renderPageToString(
        <Html
          scripts={assets.javascript}
          stylesheets={assets.styles}
          content={res.routerContext}
        />
      ));
    } catch (error) {
      res.render500(error);
    }
  };
}
