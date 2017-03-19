import { randomRange, json } from '../utils';

export const FETCH_HAND = 'FETCH_HAND';
export const FETCH_HAND_PENDING = `${FETCH_HAND}_PENDING`;
export const FETCH_HAND_FULFILLED = `${FETCH_HAND}_FULFILLED`;
export const FETCH_HAND_REJECTED = `${FETCH_HAND}_REJECTED`;

const getHand = (api, cardId1, cardId2) => json.get(`/api/game/${api}/${cardId1}/${cardId2}`);

export function fetchHandSuccess(data) {
  return (dispatch) => {
    dispatch({ data, type: FETCH_HAND_FULFILLED });
  };
}

export function fetchHand() {
  const DECK = 87;
  const cards = randomRange(1, DECK, 2);
  return (dispatch) => {
    dispatch({ type: FETCH_HAND_PENDING });
    return getHand('people', cards[0], cards[1])
      .then((data) => dispatch(fetchHandSuccess(data)))
      .catch((e) => dispatch({ data: e, type: FETCH_HAND_REJECTED }));
  };
}
