/* eslint-disable no-param-reassign */
import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import * as routes from '../../app/routes';

const setRouterContext = (req, res, next) => {
  match({
    routes: routes.makeRoutes(),
    location: req.url
  }, (error, redirect, renderProps) => {
    if (error) {
      throw error;
    } else if (redirect) {
      res.redirect(302, redirect.pathname + redirect.search);
    } else {
      // path * will return a 404
      const isNotFound = renderProps.routes.find((route) => route.path === '*');
      res.status(isNotFound ? 404 : 200);
      res.routerContext = renderToString(<RouterContext {...renderProps} />);
      next();
    }
  });
};

export default setRouterContext;
