import './promise'; // ie11
import './find'; // ie11

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
