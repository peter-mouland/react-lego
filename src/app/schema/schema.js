import { getJSON } from '../utils';

const getHand = (api, cardId1, cardId2) => getJSON(`/api/game/${api}/${cardId1}/${cardId2}`);

export default {
  Query: {
    getGame: async (param1, { gameType, card1, card2 }) => {
      try {
        const hand = await getHand(gameType, card1, card2);
        return {
          __typename: 'Hand',
          question: hand.question,
          answer: hand.answer,
          answerId: hand.answerId,
          cards: hand.cards.map((card) => ({ ...card, __typename: 'Card' }))
        };
      } catch (e) {
        // console.error(e);
        return false;
      }
    },
  },
};
