import React from 'react';
import PropTypes from 'prop-types';
import Route from 'react-router-dom/Route';
import Link from 'react-router-dom/Link';
import Switch from 'react-router-dom/Switch';
import DocumentMeta from 'react-document-meta';
import debug from 'debug';

import bemHelper from './utils/bem';
import MainLayout from './Layouts/MainLayout';
import Homepage from './components/Homepage/Homepage';
import Game from './containers/Game/Game';
import NotFound from './components/NotFound/NotFound';

debug('lego:routes');
const cn = bemHelper({ block: 'link' });

const baseMetaData = {
  title: 'React Lego',
  description: 'React Lego : incrementally add more cool stuff to your react app',
  meta: {
    charSet: 'utf-8',
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
    component: Homepage
  },
  {
    name: 'game',
    path: '/game/',
    label: 'Star Wars Trivia',
    meta: {
      ...baseMetaData,
      title: 'Star Wars Trivia',
    },
    component: Game
  }
];

export const findRoute = (to) => getRoutesConfig().find((rt) => rt.name === to);

// test this active link and route matching
export const NamedLink = ({
  className, to, children, ...props
}) => {
  const route = findRoute(to);
  if (!route) throw new Error(`Route to '${to}' not found`);
  return (
    <Route
      path={route.path}
      exact
      children={({ match }) => ( // eslint-disable-line react/no-children-prop
        <Link to={route.path} {...props} className={cn(null, { active: match }, className)}>
          { children || route.label }
        </Link>
    )}
    />
  );
};

NamedLink.propTypes = {
  to: PropTypes.string.isRequired,
  className: PropTypes.string,
  children: PropTypes.element,
};

NamedLink.defaultProps = {
  className: '',
  children: null,
};

const RouteWithMeta = ({ component: Component, meta, ...props }) => (
  <Route
    {...props}
    render={(matchProps) => (
      <span>
        <DocumentMeta {...meta} />
        <Component {...matchProps} />
      </span>
  )}
  />
);

RouteWithMeta.propTypes = {
  component: PropTypes.func.isRequired,
  meta: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    meta: PropTypes.shape({
      charSet: PropTypes.string,
      name: PropTypes.shape({
        keywords: PropTypes.string,
      })
    })
  }).isRequired,
};

export function makeRoutes() {
  return (
    <MainLayout>
      <Switch>
        {getRoutesConfig().map((route) => <RouteWithMeta {...route} key={route.name} />)}
        <Route title="Page Not Found - React Lego" component={NotFound} />
      </Switch>
    </MainLayout>
  );
}
