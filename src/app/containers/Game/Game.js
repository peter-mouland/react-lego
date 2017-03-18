import React from 'react';
import debug from 'debug';

import { randomRange, json } from '../../utils';
import Question from '../../components/Question/Question';
import Answer from '../../components/Answer/Answer';

debug('lego:Game');

const DECK = 87;
export const Error = ({ error }) => <p className="error">Error Loading cards!<span>{error}</span></p>;
export const Loading = () => <p className="loading">Loading hand....</p>;
const getHand = (api, cardId1, cardId2) => json.get(`/api/game/${api}/${cardId1}/${cardId2}`);

export default class Game extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      error: false,
      loading: false,
      showAnswer: false,
      attempt: null
    };
    this.deal = this.deal.bind(this);
    this.viewAnswer = this.viewAnswer.bind(this);
    this.setAttempt = this.setAttempt.bind(this);
  }

  componentDidMount() {
    this.deal();
  }

  deal() {
    const cardsIds = randomRange(1, DECK, 2);
    const gameType = 'people';
    this.setState({
      error: false,
      loading: true
    });
    return getHand(gameType, cardsIds[0], cardsIds[1])
      .then((hand) => {
        this.setState({
          hand,
          loading: false
        });
      })
      .catch((e) => {
        this.setState({
          error: e,
          loading: false
        });
      });
  }

  setAttempt(attempt) {
    this.setState({ attempt });
  }

  viewAnswer() {
    this.setState({ showAnswer: true });
  }

  render() {
    const {
      error, loading, showAnswer, attempt, hand: { cards = [], question, answer, answerId } = {}
    } = this.state;
    return (
      <div id="game">
        <banner className="header">
          <h1>Star Wars Trivia</h1>
          <p>A simple game using <a href="http://www.swapi.com" target="_blank">SWAPI</a>.</p>
        </banner>
        <button onClick={() => this.deal()}>Deal cards!</button>
        {error && <Error error={ error } />}
        {loading ?
          <Loading /> :
          <Question { ...{ showAnswer, answer, cards, attempt, onClick: this.setAttempt } }>
            {question}
          </Question>
        }
        {!!cards.length && (
          <button className="game__btn--show-answer" onClick={() => this.viewAnswer()}>
            View Answer
          </button>
        ) }
        {!!cards.length && (
          <Answer cards={ cards } answerId={ answerId } showAnswer={ showAnswer } />
        ) }
      </div>
    );
  }
}
