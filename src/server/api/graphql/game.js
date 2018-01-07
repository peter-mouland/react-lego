import config from '../../../config/environment';
import { randomRange, getJSON } from '../../../app/utils';

const getSwapiData = (api, id) => getJSON(`${config.api.host}${api}/${id}/`);

const schema = (`
type GameCard {
  birth_year : String
  created : String
  edited : String
  eye_color : String
  films : [String]
  gender : String
  hair_color : String
  height : String
  homeworld : String 
  mass : String
  name : String
  skin_color : String
  species : [String]
  starships : [String]
  url : String
  vehicles : [String] 
}

type Hand {
  gameType: String!
  question: String
  answer: String
  cards: [GameCard]
  answerId: String
}
`);

export const handQuery = `
getHand(gameType: String, card1: Int, card2: Int): Hand
`;

export class Hand {
  constructor(cards = []) {
    if (cards.length < 2) {
      throw new Error('You needs more than 2 cards to play a game');
    }
    const answerIndex = randomRange(0, 1, 1)[0];
    const factIndex = randomRange(0, 7, 1)[0];
    this.cards = cards;
    this.wrongCard = this.cards[1 - answerIndex];
    this.answerCard = this.cards[answerIndex];
    this.answerKey = Object.keys(this.answerCard)[factIndex];
  }

  get question() {
    const fact = this.answerCard[this.answerKey];
    const extra = fact > this.wrongCard[this.answerKey] ? 'taller' : 'smaller';
    const answerText = this.answerKey === 'height'
      ? `${extra}, ${this.cards[0].name} or ${this.cards[1].name}`
      : fact;
    return `Who's ${this.answerKey} is ${answerText}?`;
  }

  get answerId() {
    return this.answerCard.url;
  }

  get answer() {
    const wrongAnswer = this.wrongCard[this.answerKey];
    const answer = this.answerCard[this.answerKey];
    switch (true) {
      case (wrongAnswer === 'unknown' && wrongAnswer !== answer):
        return 'unknown';
      case (wrongAnswer === answer):
        return 'both';
      default:
        return this.answerCard.name;
    }
  }
}

export const getHand = ({ gameType, card1, card2 }) => {
  const promises = [getSwapiData(gameType, card1), getSwapiData(gameType, card2)];
  return Promise.all(promises).then((cards) => {
    const hand = new Hand(cards);
    return {
      cards, question: hand.question, answerId: hand.answerId, answer: hand.answer
    };
  });
};

export default schema;
