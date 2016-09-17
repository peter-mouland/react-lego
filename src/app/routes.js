import React from 'react';
import { Route, IndexRoute, Link } from 'react-router';
import debug from 'debug';

import MainLayout from './Layouts/MainLayout';
import Homepage from './containers/Homepage/Homepage';
import Game from './containers/Game/Game';
import NotFound from './containers/NotFound/NotFound';

debug('lego:routes');

const siteTitle = 'React Lego';

export const routes = {
  homepage: {
    path: '/',
    label: 'About React Lego',
    title: `${siteTitle} - About React Lego`,
    component: Homepage
  },
  game: {
    path: '/game/',
    label: 'Star Wars Trivia',
    title: `${siteTitle} - Star Wars Trivia`,
    component: Game
  }
};

const indexRoute = (route) => Object.assign({}, route, { path: null });

export const LinkHelper = ({ to, ...props }) => {
  if (!routes[to]) throw new Error(`Route to '${to}' not found`);
  return (
    <Link to={ routes[to].path } { ...props }>
      { props.children || routes[to].label }
    </Link>
  );
};

export function makeRoutes() {
  return (
    <Route path="/" component={ MainLayout }>
      <IndexRoute { ...indexRoute(routes.homepage) } />
      <Route { ...routes.game } />
      <Route path="*" title ={`${siteTitle} - Page Not Found`} component={ NotFound} />
    </Route>
  );
}
