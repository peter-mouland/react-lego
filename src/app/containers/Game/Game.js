import React from 'react';
import { connect } from 'react-redux';
import debug from 'debug';

import Question from '../../components/Question/Question';
import Answer from '../../components/Answer/Answer';
import { fetchHand } from '../../actions';

const log = debug('lego:Game');

export const Error = ({ error }) => <p className="error">Error Loading cards!<span>{error}</span></p>;

export const Errors = ({ errors }) => { // eslint-disable-line arrow-body-style
  return Array.isArray(errors)
    ? errors.map((error) => <Error error={ error } />)
    : <Error error={ errors } />;
};
export const Loading = () => <p className="loading">Loading hand....</p>;

class Game extends React.Component {

  static needs = [fetchHand];

  constructor(props) {
    super(props);
    this.state = {
      showAnswer: false,
      attempt: null
    };
    this.deal = this.deal.bind(this);
    this.viewAnswer = this.viewAnswer.bind(this);
    this.setAttempt = this.setAttempt.bind(this);
  }

  componentDidMount() {
    if (this.props.hand) return;
    this.deal();
  }

  deal() {
    this.setState({
      showAnswer: false,
      attempt: null
    });
    return this.props.fetchHand();
  }

  setAttempt(attempt) {
    this.setState({ attempt });
  }

  viewAnswer() {
    this.setState({ showAnswer: true });
  }

  render() {
    const {
      error, loading, hand: { cards = [], question, answer, answerId } = {}
    } = this.props;
    const { showAnswer, attempt } = this.state;
    return (
      <div id="game">
        <banner className="header">
          <h1>Star Wars Trivia</h1>
          <p>A simple game using <a href="http://www.swapi.com" target="_blank">SWAPI</a>.</p>
        </banner>
        <button className="game__btn--deal" onClick={() => this.deal()}>
          Deal cards!
        </button>
        {error && <Errors errors={ error } />}
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

function mapStateToProps(state) {
  return { ...state.game };
}

export default connect(
  mapStateToProps,
  { fetchHand }
)(Game);
