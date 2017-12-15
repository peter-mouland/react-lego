import { getJSON } from '../utils';

const getHand = (api, cardId1, cardId2) => getJSON(`/api/game/${api}/${cardId1}/${cardId2}`);

/*
 * Schema
 *
 * this is a direct model of the previous redux data shape
 *
 * type Query {
 *  getGame(gameType: $gameType card1: $card1 card2: $card2): Hand
 * }
 *
 * type Hand {
 *  cards: [Card]
 *  question: String
 *  answer: String
 *  answerId: String
 * }
 *
 * type Card {
 *  birth_year
 *  created
 *  edited
 *  eye_color
 *  films
 *  gender
 *  hair_color
 *  height
 *  homeworld
 *  mass
 *  name
 *  skin_color
 *  species
 *  starships
 *  url
 *  vehicles
 * }
 *
 *
 */

export default {
  Query: {
    // this is only called on a cache miss
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
