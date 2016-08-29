import React from 'react';
import debug from 'debug';

import { iso } from '../../utils/index';
import { randomRange, getQuestionAndAnswer } from './game-helpers';
import Question from '../../components/Question/Question';
import Answer from '../../components/Answer/Answer';

debug('lego:Game');

const DECK = 87;
const Error = () => <p>Error Loading cards!</p>;
const Dealing = () => <p>Loading cards....</p>;

export default class Game extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      cards: [],
      error: false,
      dealing: false,
      showAnswer: false,
      attempt: null
    };
    this.deal = this.deal.bind(this);
    this.viewAnswer = this.viewAnswer.bind(this);
    this.setAttempt = this.setAttempt.bind(this);
  }

  componentDidMount() {
    this.getCardsFromApi('people');
  }

  getCardsFromApi(api) {
    const dealtCards = randomRange(1, DECK, 2);
    const promises = dealtCards.map(cardId => iso.fetch(`//swapi.co/api/${api}/${cardId}/`));
    return Promise.all(promises)
      .then(cards => {
        this.setState({
          [api]: cards,
          dealing: false
        });
      })
      .catch(() => {
        this.setState({
          error: true,
          dealing: false
        });
      });
  }

  deal(api) {
    if (this.state[api]) {
      const cards = this.state[api];
      const answerInt = randomRange(0, 1, 1)[0];
      const factInt = randomRange(0, 7, 1)[0];
      this.setState({
        QandA: getQuestionAndAnswer({ cards, answerInt, factInt }),
        cards,
        [api]: false,
        dealing: false,
        error: false,
        showAnswer: false,
        attempt: null
      });
      this.getCardsFromApi('people');
    } else {
      this.setState({ cards: [], dealing: true, error: false, showAnswer: false, attempt: null });
      this.getCardsFromApi('people').then(() => {
        this.setState({ cards: this.state.people, dealing: true, error: false, showAnswer: false });
      });
    }
  }

  setAttempt(attempt) {
    this.setState({ attempt });
  }

  viewAnswer() {
    this.setState({ showAnswer: true });
  }

  render() {
    const {
      cards, dealing, error, showAnswer, attempt, QandA: { correctCard, question, answer } = {},
    } = this.state;

    return (
      <div id="game">
        <banner className="header">
          <h1>Star Wars Trivia</h1>
          <p>A simple game using <a href="http://www.swapi.com" target="_blank">SWAPI</a>.</p>
        </banner>
        <button onClick={() => this.deal('people')}>Deal 'People' cards!</button>
        {error && <Error />}
        {dealing && <Dealing />}
        <Question { ...{ showAnswer, answer, cards, attempt, onClick: this.setAttempt } }>
          {question}
        </Question>
        {!!cards.length && <button onClick={() => this.viewAnswer()}>View Answer</button>}
        <Answer cards={ cards } correctCard={ correctCard } showAnswer={ showAnswer } />
      </div>
    );
  }
}
