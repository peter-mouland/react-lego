import React from 'react';
import PropTypes from 'prop-types';

import config from '../../config/environment';

export const Error = ({ error }) => {
  if (typeof error !== 'string') {
    return <p className="error">{String(error)} <strong>needs to be handled, was not a string</strong></p>;
  }
  return <p className="error">Error Loading cards!<span>{String(error)}</span></p>;
};
export const Loading = () => <p className="loading">Loading hand....</p>;

export default class Homepage extends React.Component {
  static propTypes = {
    loading: PropTypes.bool.isRequired,
    handleDeal: PropTypes.func.isRequired,
  };

  static defaultProps = {
    cards: [],
    loading: true,
    error: null,
  };

  deal = (e) => {
    e.preventDefault();
    this.props.handleDeal();
  };

  render() {
    const {
      cards, question, error, loading
    } = this.props;
    const options = cards.length ? [cards[0].name, cards[1].name, 'both', 'unknown'] : [];

    return (
      <div id="game">
        <h1>Apollo Example</h1>
        <button className={'game__btn--deal'} onClick={this.deal}>Deal!</button>
        {error && <Error error={ error } />}
        {loading ?
          <Loading /> :
          <section className="question">
            <p className="question__text" >{question}</p>
            <ul className="question__options">
              {options.map((option, i) => (
                <li className={'question__option'} key={i}>
                  {option}
                </li>
              ))}
            </ul>
          </section>
        }
      </div>
    );
  }
}
