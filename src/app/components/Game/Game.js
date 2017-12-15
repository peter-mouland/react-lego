import React from 'react';
import PropTypes from 'prop-types';
import debug from 'debug';

import Question from '../Question/Question';
import Answer from '../Answer/Answer';
import config from '../../../config/environment';

debug('lego:Game');

export const Error = ({ error }) => {
  if (typeof error !== 'string') {
    return <p className="error">{String(error)} <strong>needs to be handled, was not a string</strong></p>;
  }
  return <p className="error">Error Loading cards!<span>{String(error)}</span></p>;
};
export const Loading = () => <p className="loading">Loading hand....</p>;

export default class Game extends React.Component {
  static propTypes = {
    loading: PropTypes.bool.isRequired,
    handleDeal: PropTypes.func.isRequired,
  };

  static defaultProps = {
    loading: true,
    error: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      showAnswer: false,
      attempt: null
    };
  }

  deal = (e) => {
    e.preventDefault();
    this.props.handleDeal();
  };

  setAttempt = (attempt) => {
    this.setState({ attempt });
  }

  viewAnswer = () => {
    this.setState({ showAnswer: true });
  }

  render() {
    const {
      showAnswer, attempt
    } = this.state;
    const {
      cards = [], question, answer, answerId, error, loading
    } = this.props;

    return (
      <div id="game">
        <header className="header">
          <h1>Star Wars Trivia</h1>
          <p>A simple game using <a href={config.api.homepage} target="_blank">{config.api.label}</a>.</p>
        </header>
        <button className={'game__btn--deal'} onClick={this.deal}>Deal cards!</button>
        {error && <Error error={ error } />}
        {loading ?
          <Loading /> :
          <Question { ...{
            showAnswer, answer, cards, attempt, onClick: this.setAttempt
          } }>
            {question}
          </Question>
        }
        {!!cards.length && (
          <button className="game__btn--show-answer" onClick={() => this.viewAnswer()}>
            View Answer
          </button>
        ) }
        {showAnswer && (
          <Answer cards={ cards } answerId={ answerId } showAnswer={ showAnswer } />
        ) }
      </div>
    );
  }
}
