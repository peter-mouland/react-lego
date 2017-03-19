import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import debug from 'debug';

import * as actions from '../actions';

const log = debug('lego:reducers/index');

export function game(state = {}, action) {
  switch (action.type) {
    case actions.FETCH_HAND_PENDING:
      return {
        ...state,
        loading: true,
        error: false,
        status: action.status
      };
    case actions.FETCH_HAND_FULFILLED:
      return {
        ...state,
        loading: false,
        error: false,
        hand: action.data,
        status: action.status
      };
    case actions.FETCH_HAND_REJECTED:
      return {
        ...state,
        loading: false,
        error: action.data,
        status: action.status
      };
    default:
      return state;
  }
}

export default combineReducers({
  game,
  routing
});
