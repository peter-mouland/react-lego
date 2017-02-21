import './find';
import { routes } from '../routes';

export { fetch, json } from './fetch';
export { randomRange } from './randomRange';

const navigator = global.navigator && global.navigator.userAgent;
// hasWindow = true for tests + client
export const hasWindow = typeof window !== 'undefined';
// isBrowser = true for client only
export const isBrowser = typeof navigator !== 'undefined' && navigator.indexOf('Node.js') === -1;

const getLocalUrl = () => {
  if (isBrowser) {
    const location = window.location;
    if (!location.origin) { // Some browsers (mainly IE) does not have this property
      location.origin = `${location.protocol}//${location.hostname}${location.port
        ? (`:${location.port}`)
        : ''}`;
    }
    return location.origin;
  }
  return `http://localhost:${process.env.PORT}`;
};

export const localUrl = getLocalUrl();

export function findRoute(pathname) {
  const routesArr = Object.keys(routes);
  const match = routesArr.find((key) => {
    const route = routes[key];
    return pathname.replace(/(\?.*)|(#.*)/g, '') === route.path;
  });
  return routes[match];
}
