/* eslint-disable import/prefer-default-export */

export function searchQueryToJson(search) {
  try {
    return JSON.parse(`{"${decodeURI(search.replace(/\?/, ''))
        .replace(/"/g, '\\"')
        .replace(/&/g, '","')
        .replace(/=/g, '":"')}"}`);
  } catch (e) {
    return {};
  }
}
