/* global fetch */
import debug from 'debug';

import { localUrl } from '../utils';

const log = debug('base:fetch');

export function checkStatus(response) {
  if (response.status < 200 || response.status >= 500) {
    const error = new Error(response.statusText);
    error.response = response;
    throw error;
  }
  return response;
}

const jsonOpts = (method, data) => ({
  method,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  data: data && JSON.stringify(data)
});

export const fetchUrl = (endpoint, opts = {}) => {
  const url = endpoint.indexOf('//') > -1 ? endpoint : `${localUrl}${endpoint}`;
  return fetch(url, { ...opts })
    .then(checkStatus)
    .then((response) => response.text())
    .catch((error) => {
      log('request failed', error);
      throw new Error('request failed');
    });
};

export const getJSON = (url, options) =>
  fetchUrl(url, jsonOpts('GET', null, options)).then((data) => JSON.parse(data));

export const postJSON = (url, data, options) =>
  fetchUrl(url, jsonOpts('POST', data, options));
