/* global fetch */
import debug from 'debug';

import { localUrl } from '../utils';

const log = debug('base:fetch');

function queryParams(params) {
  return Object.keys(params)
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    .join('&');
}

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

const graphQLOpts = (data, params) => ({
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/graphql',
    credentials: 'same-origin',
  },
  body: data,
  params
});

export const fetchUrl = (endpoint, opts = {}) => {
  let url = endpoint.indexOf('//') > -1 ? endpoint : `${localUrl}${endpoint}`;

  if (opts.params) {
    url += (url.indexOf('?') === -1 ? '?' : '&') + queryParams(opts.params);
  }

  return fetch(url, { ...opts })
    .then(checkStatus)
    .then((response) => response.text())
    .catch((error) => {
      console.log('request failed', error);
      throw new Error('request failed');
    });
};

export const getJSON = (url, options) =>
  fetchUrl(url, jsonOpts('GET', null, options)).then((data) => JSON.parse(data));

export const postJSON = (url, data, options) =>
  fetchUrl(url, jsonOpts('POST', data, options));

export const fetchGraphQL = (data, variables) =>
  fetchUrl('/graphql', graphQLOpts(data, variables)).then((response) => JSON.parse(response));
