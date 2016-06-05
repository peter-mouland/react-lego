import fetch from 'isomorphic-fetch';

export function chunk(arr, chunkSize) {
  return arr
    .map((item, index) => (
      index % chunkSize === 0
        ? arr.slice(index, index + chunkSize)
        : null)
    )
    .filter(item => !!item);
}

/* eslint-disable */
export function randomRange(from, to, length) {
  if (to < from) return [];
  var tem, returnArray = [], loopCount = 0, i = 0;
  randomRangeLoop:
    while (loopCount < length) {
      tem = Math.floor(Math.random() * to) + from;
      i = 0;
      while (i < loopCount) {
        if (returnArray[i++] === tem) continue randomRangeLoop;
      }
      returnArray[loopCount++] = tem;
    }
  return returnArray;
}
/* eslint-disable */

export const getCardDetails = (cards) => {
  const promises = cards.map(cardId => {
    return fetch(`//swapi.co/api/people/${cardId}/`)
      .then(function (response) {
        if (response.status >= 400) {
          throw new Error('Bad response from server');
        }
        return response.json();
      });
  });
  return Promise.all(promises);
};
