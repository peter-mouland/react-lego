import isoFetch from 'isomorphic-fetch';
import debug from 'debug';

import { localUrl } from '../utils';

const log = debug('lego:api/index');

export function checkStatus(response) {
  if (response.status < 200 || response.status >= 300) {
    const error = new Error(response.statustext);
    error.response = response;
    throw error;
  }
  return response;
}

const jsonOpts = (method, data) => ({
  method,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(data)
});

const fetchUrl = (url, opts) => {
  const fullUrl = url.indexOf('//') > -1 ? url : `${localUrl}/${url}`;
  return isoFetch(fullUrl, opts)
    .then(checkStatus)
    .then((res) => res.json())
    .then((json) => json)
    .catch((error) => {
      log('request failed', error);
      throw new Error('request failed');
    });
};

const getJSON = (url) => fetchUrl(url, jsonOpts('GET'));
const postJSON = (url, data) => fetchUrl(url, jsonOpts('POST', data));

export const fetch = {
  url: fetchUrl
};
export const json = {
  get: getJSON,
  post: postJSON
};
