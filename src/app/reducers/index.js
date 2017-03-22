/* eslint-disable no-param-reassign */
import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import debug from 'debug';

import * as actions from '../actions';

const log = debug('lego:reducers/index');

export function wordCounts(text) {
  if (!text) return {};
  const wordsArray = text.toLowerCase().split(/[,.;?']*\s/);
  return wordsArray.reduce((prev, curr) => {
    const word = curr.trim();
    if (word && prev[word]) {
      prev[word] += 1;
    } else if (word) {
      prev[word] = 1;
    }
    return prev;
  }, {});
}

export function book(state = {}, action) {
  const payload = action.payload || {};
  switch (action.type) {
    case `${actions.FETCH_BOOK}_PENDING`:
      return {
        ...state,
        loading: true,
        error: false,
        status: action.status
      };
    case `${actions.FETCH_BOOK}_FULFILLED`:
      return {
        ...state,
        loading: false,
        error: !payload.getBook,
        book: {
          ...payload.getBook,
          wordCounts: payload.getBook ? wordCounts(payload.getBook.text) : {}
        },
        status: action.status
      };
    case `${actions.FETCH_BOOK}_REJECTED`:
      return {
        ...state,
        loading: false,
        error: action.payload,
        status: action.status
      };
    default:
      return state;
  }
}

export default combineReducers({
  book,
  routing
});
