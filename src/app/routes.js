import { h } from 'preact';
import Router from 'preact-router';
import debug from 'debug';

import MainLayout from './Layouts/MainLayout';
import Homepage from './containers/Homepage/Homepage';
import Game from './containers/Game/Game';
import NotFound from './containers/NotFound/NotFound';

debug('lego:routes');

const baseMetaData = {
  title: 'React Lego',
  description: 'React Lego : incrementally add more cool stuff to your react app',
  meta: {
    charset: 'utf-8',
    name: {
      keywords: 'react,example'
    }
  }
};
export const getRoutesConfig = () => [
  {
    name: 'homepage',
    exact: true,
    path: '/',
    meta: {
      ...baseMetaData,
      title: 'About React SSR Base'
    },
    label: 'About SSR Base',
  },
  {
    name: 'game',
    path: '/game/',
    label: 'Star Wars Trivia',
    meta: {
      ...baseMetaData,
      title: 'Star Wars Trivia',
    },
  }
];

export const findRoute = (to) => getRoutesConfig().find((rt) => rt.name === to);

export const NamedLink = ({ className, to, children, ...props }) => {
  const route = findRoute(to);
  if (!route) throw new Error(`Route to '${to}' not found`);
  return (
    <a href={ route.path } { ...props } className={"link " + className}>
      { children.length > 0 ? children :  route.label }
    </a>
  );
};

export function makeRoutes() {
  return (
    <MainLayout>
      <Router>
        <Homepage { ...findRoute('homepage') } />
        <Game { ...findRoute('game') } />
        <NotFound default  title ={`Page Not Found`}  />
      </Router>
    </MainLayout>
  );
}
