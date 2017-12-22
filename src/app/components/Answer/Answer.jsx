import React from 'react';
import PropTypes from 'prop-types';
import config from '../../../config/environment';

import './answer.scss';

const cardShape = {
  birth_year: PropTypes.string,
  created: PropTypes.string,
  edited: PropTypes.string,
  eye_color: PropTypes.string,
  films: PropTypes.arrayOf(PropTypes.string),
  gender: PropTypes.string,
  hair_color: PropTypes.string,
  height: PropTypes.string,
  homeworld: PropTypes.string,
  mass: PropTypes.string,
  name: PropTypes.string,
  skin_color: PropTypes.string,
  species: PropTypes.arrayOf(PropTypes.string),
  starships: PropTypes.arrayOf(PropTypes.string),
  url: PropTypes.string,
  vehicles: PropTypes.arrayOf(PropTypes.string),
};

export const CardItemValue = ({ value }) => {
  const values = [].concat(value);
  const props = { className: 'card-item-value' };
  return (
    <div >{
      values
        .map((val, i) => {
          props.key = `${i}-${val}`;
          const text = val.replace(config.api, '');
          return val.indexOf(config.api) === 0
            ? <a href={val} target="_blank" {...props}>{ text }</a>
            : <span {...props}>{ text }</span>;
        })
    }
    </div>
  );
};

CardItemValue.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.array]).isRequired
};

export const AnswerOption = ({ isAnswer, card }) => (
  <dl className={`answer-option ${isAnswer ? 'answer-option--answer' : ''}`}>
    {Object.keys(card).map((info) => (
      <span className="answer-option__item" key={info}>
        <dt className="answer-option__title">{info}</dt>
        <dd className="answer-option__value"><CardItemValue value={card[info]} /></dd>
      </span>
    ))}
  </dl>
);

AnswerOption.propTypes = {
  isAnswer: PropTypes.bool.isRequired,
  card: PropTypes.shape(cardShape).isRequired
};

const Answer = ({
  cards, answerId, showAnswer, ...props
}) => (
  <section className={`answer ${showAnswer ? 'visible' : 'hidden'}`} {...props}>
    <AnswerOption isAnswer={answerId === cards[0].url} card={cards[0]} />
    <AnswerOption isAnswer={answerId === cards[1].url} card={cards[1]} />
  </section>
);

Answer.propTypes = {
  cards: PropTypes.arrayOf(PropTypes.shape(cardShape)),
  answerId: PropTypes.string.isRequired,
  showAnswer: PropTypes.bool
};

Answer.defaultProps = {
  cards: [],
  showAnswer: false
};

export default Answer;
