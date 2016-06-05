import reduce from 'lodash/reduce';
import React from 'react';
import find from 'lodash/find';
import get from 'lodash/get';
import { routes } from '../routes';

const navigator = get(global, 'navigator.userAgent');
// hasWindow = true for tests + client
export const hasWindow = typeof window !== 'undefined';
// isBrowser = true for client only
export const isBrowser = typeof navigator !== 'undefined' && navigator.indexOf('Node.js') === -1;

/*
 replaceText('I like {cake} and {sweetcorn}', { cake: 'beer', sweetcorn: 'pie' })
 "I like beer and pie"
*/
function replaceText(text, replacers) {
  return reduce(replacers, (textIn, val, key) => textIn.replace(`{${key}}`, val), text);
}

export const markup = (tag, copy, replacers) =>
  [].concat(copy).map((text, i) =>
    React.createElement(tag, { key: i }, replaceText(text, replacers))
  );

export function findRoute(pathname) {
  return find(routes, (route) =>
    pathname
      .replace(/(\?.*)|(#.*)/g, '')
      .replace(/\/$/, '')
      .replace(/^\//, '') === route.path
  );
}
