import { json } from '../utils';

export default {
  fetchCards(game, cards) {
    return json.get(`api/game/${game}/${cards[0]}/${cards[1]}`);
  },
};
