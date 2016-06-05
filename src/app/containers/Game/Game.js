import React from 'react';
import debug from 'debug';

import { copy } from './game-copy';
import { randomRange, getCardDetails } from '../../utils/game-helpers';
import Card from '../../components/Card/Card';

debug('lego:Game');

const DECK = 87;

export default class Game extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      cards: [],
      dealing: false
    };
    this.deal = this.deal.bind(this);
  }

  deal() {
    this.setState({ cards: [], dealing: true });
    const dealtCards = randomRange(1, DECK, 2);
    getCardDetails(dealtCards).then(cards => {
      this.setState({
        cards,
        dealing: false
      });
    });
  }

  getCardGameProps(cards) {
    if (!cards.length) return {};
    const randomCardI = randomRange(0, 1, 1)[0];
    const randomFactI = randomRange(0, 7, 1)[0];
    const wrongCard = cards[1 - randomCardI];
    const correctCard = cards[randomCardI];
    const randomFactKey = Object.keys(correctCard)[randomFactI];
    return { cards, wrongCard, correctCard, randomFactKey };
  }

  render() {
    const { cards, dealing } = this.state;
    const cardGameProps = this.getCardGameProps(cards);

    return (
      <div id="game">
        <banner className="header">
          <h1>{copy.title}</h1>
          <p>{copy.blurb}</p>
        </banner>
        <h2>Star Wars Trivia</h2>
        <section className="game__options">
          <button onClick={this.deal}>Deal!</button>
        </section>
        <div>
          {!!dealing
            ? 'Loading cards....'
            : null
          }
          </div>
        <section className="game__play-area">
          {!!cards.length
            ? <Card { ...cardGameProps } />
            : null
          }
        </section>
      </div>
    );
  }
}
