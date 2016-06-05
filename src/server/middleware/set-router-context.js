import React from 'react';
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
      res.status(isNotFound ? 404 : 200); // eslint-disable-line
      res.routerContext = <RouterContext {...renderProps} />; // eslint-disable-line
      next();
    }
  });
};

export default setRouterContext;
