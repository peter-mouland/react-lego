import { json } from '../utils';

const getCard = (api, cardId) => json.get(`http://swapi.co/api/${api}/${cardId}/`);

export default {
  fetchCards(api, cards) {
    return Promise.all([getCard(api, cards[0]), getCard(api, cards[1])]);
  },
};
