import React from 'react';
import PropTypes from 'prop-types';
import debug from 'debug';

import Error from '../Error/Error';
import Loading from '../Loading/Loading';
import Question from '../Question/Question';
import Answer from '../Answer/Answer';
import config from '../../../config/environment';

debug('lego:Game');

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showAnswer: false,
      attempt: null,
    };
  }

  componentDidMount() {
    this.deal();
  }

  setAttempt = (attempt) => {
    this.setState({ attempt });
  }

  viewAnswer = () => {
    this.setState({ showAnswer: true });
  }

  deal = () => {
    this.setState({
      showAnswer: false,
      attempt: null
    });
    this.props.fetchHand();
  }

  render() {
    const {
      error, loading, hand: {
        cards = [], question, answer, answerId
      } = {}
    } = this.props;
    const { showAnswer, attempt } = this.state;

    return (
      <div id="game">
        <header className="header">
          <h1>Star Wars Trivia</h1>
          <p>A simple game using <a href={config.api.homepage} target="_blank">{config.api.label}</a>.</p>
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


Game.propTypes = {
  error: PropTypes.bool,
  loading: PropTypes.bool,
  fetchHand: PropTypes.func.isRequired,
  hand: PropTypes.shape({
    question: PropTypes.string,
    answer: PropTypes.string,
    answerId: PropTypes.string,
    cards: PropTypes.array
  })
};

Game.defaultProps = {
  error: false,
  loading: false,
  hand: {}
};

export default Game;
