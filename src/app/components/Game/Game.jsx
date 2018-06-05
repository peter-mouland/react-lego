import React from 'react';
import debug from 'debug';

import { randomRange, getJSON } from '../../utils/index';
import Error from '../Error/Error';
import Loading from '../Loading/Loading';
import Hand from './hand';
import Question from '../Question/Question';
import Answer from '../Answer/Answer';
import config from '../../../config/environment';

debug('lego:Game');

const DECK = 87;

const getCard = (api, cardId) => getJSON(`${config.api.host}${api}/${cardId}/`);

export default class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      loading: false,
      showAnswer: false,
      attempt: null,
    };
    this.deal = this.deal.bind(this);
    this.viewAnswer = this.viewAnswer.bind(this);
    this.setAttempt = this.setAttempt.bind(this);
  }

  componentDidMount() {
    this.deal();
  }

  setAttempt = (attempt) => {
    this.setState({ attempt });
  }

  viewAnswer() {
    this.setState({ showAnswer: true });
  }

  deal = () => {
    const cardsIds = randomRange(1, DECK, 2);
    const gameType = 'people';
    const promises = [getCard(gameType, cardsIds[0]), getCard(gameType, cardsIds[1])];
    this.setState({
      error: null,
      loading: true
    });
    return Promise.all(promises)
      .then((cards) => {
        const hand = new Hand(cards);
        this.setState({
          hand: {
            cards,
            question: hand.question,
            answerId: hand.answerId,
            answer: hand.answer
          },
          loading: false
        });
      })
      .catch((e) => {
        this.setState({
          error: e.toString(),
          loading: false
        });
      });
  }

  render() {
    const {
      error, loading, showAnswer, attempt, hand: {
        cards = [], question, answer, answerId
      } = {}
    } = this.state;

    return (
      <div id="game">
        <header className="header">
          <h1>Star Wars Trivia</h1>
          <p>A simple game using <a href={config.api.homepage} target="_blank" rel="noopener noreferrer">{config.api.label}</a>.</p>
        </header>
        <button className="game__btn--deal" onClick={() => this.deal()}>Deal cards!</button>
        {error && <Error error={error} />}
        {loading ? <Loading /> : null }
        {!loading && question ?
          <Question {...{
              showAnswer, answer, cards, attempt, onClick: this.setAttempt
            }}
          >
            {question}
          </Question>
          : null
        }
        {!!cards.length && (
          <button className="game__btn--show-answer" onClick={() => this.viewAnswer()}>
            View Answer
          </button>
        ) }
        {showAnswer && (
          <Answer cards={cards} answerId={answerId} showAnswer={showAnswer} />
        ) }
      </div>
    );
  }
}
