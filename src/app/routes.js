import React from 'react';
import { Route, IndexRoute } from 'react-router';
import debug from 'debug';

import MainLayout from './Layouts/MainLayout';
import Homepage from './containers/Homepage/Homepage';
import Search from './containers/Search/Search';
import NotFound from './containers/NotFound/NotFound';

debug('lego:routes');

export const routes = {
  homepage: {
    path: '/',
    title: 'React Lego',
    component: Homepage
  },
  search: {
    path: 'search',
    title: 'React Lego - Search',
    breadcrumb: '/home',
    component: Search
  },
  notFound: {
    path: '*', // path * will return a 404
    title: 'Page Not Found',
    component: NotFound
  }
};

// todo : make ie compatible
const indexRoute = (route) => Object.assign({}, route, { path: null });

export function makeRoutes() {
  return (
    <Route path="/" component={ MainLayout }>
      <IndexRoute { ...indexRoute(routes.homepage) } />
      <Route { ...routes.search } />
      <Route { ...routes.notFound } />
    </Route>
  );
}
