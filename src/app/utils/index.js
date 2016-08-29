import find from 'lodash/find';
import get from 'lodash/get';
import fetch from 'isomorphic-fetch';

import { routes } from '../routes';

import './object.assign';

const navigator = get(global, 'navigator.userAgent');
// hasWindow = true for tests + client
export const hasWindow = typeof window !== 'undefined';
// isBrowser = true for client only
export const isBrowser = typeof navigator !== 'undefined' && navigator.indexOf('Node.js') === -1;

export function findRoute(pathname) {
  return find(routes, (route) =>
    pathname
      .replace(/(\?.*)|(#.*)/g, '')
      .replace(/\/$/, '')
      .replace(/^\//, '') === route.path
  );
}

export const iso = {
  fetch: (url, options = {}) => (
    fetch(url, options)
      .then((response) => {
        if (response.status >= 400) {
          throw new Error('Bad response from server');
        }
        return response.json();
      })
      .catch(() => {
        throw new Error('Bad response from server');
      })
  )
};
