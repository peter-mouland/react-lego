import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import Homepage from '../components/Homepage';
import { randomRange } from '../utils/index';

const GET_GAME = gql`
  query ($gameType: String!, $card1: Int!, $card2: Int!) {
    getGame(gameType: $gameType card1: $card1 card2: $card2) @client {
      answerId,
      cards {
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
      },
      question,
      answer
    }
  }
`;

const withHands = graphql(GET_GAME, {
  options: { notifyOnNetworkStatusChange: true },
  props: ({ data, ownProps }) => ({
    ...ownProps,
    ...data,
    answer: data.getGame ? data.getGame.answer : '',
    question: data.getGame ? data.getGame.question : '',
    answerId: data.getGame ? data.getGame.answerId : null,
    cards: data.getGame ? data.getGame.cards : [],
  }),
});

const HomepageWithData = withHands(Homepage);

const DECK = 87;
const cards = randomRange(1, DECK, 2);
// this will be much easier with react-apollo 2.0
export default class VariableChange extends React.Component {
  state = { gameType: 'people', card1: cards[0], card2: cards[1] };

  deal = () => {
    const update = randomRange(1, DECK, 2);
    this.setState({ card1: update[0], card2: update[1] });
  }

  render() {
    return (
      <HomepageWithData
        gameType={this.state.gameType}
        card1={this.state.card1}
        card2={this.state.card2}
        handleDeal={this.deal}
      />
    );
  }
}
