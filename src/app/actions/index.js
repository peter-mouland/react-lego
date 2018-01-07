import { randomRange, fetchGraphQL } from '../utils';

export const FETCH_HAND = 'FETCH_HAND';

const getHandQuery = `
query ($gameType: String!, $card1: Int!, $card2: Int!) { getHand(gameType: $gameType card1: $card1 card2: $card2){ answerId, cards { ...cardInfo }, question, answer } } 
 
fragment cardInfo on GameCard {
 birth_year
 created
 edited
 eye_color
 films
 gender
 hair_color
 height
 homeworld
 mass
 name
 skin_color
 species
 starships
 url
 vehicles
}
`;

export function fetchHand() {
  const DECK = 87;
  const cards = randomRange(1, DECK, 2);
  return {
    type: FETCH_HAND,
    payload: fetchGraphQL(getHandQuery, { gameType: 'people', card1: cards[0], card2: cards[1] })
  };
}
