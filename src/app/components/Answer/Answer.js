import React from 'react';
import config from '../../../config/environment';

import './answer.scss';

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
            ? <a href={val} target="_blank" { ...props }>{ text }</a>
            : <span { ...props }>{ text }</span>;
        })
    }</div>
  );
};

export const AnswerOption = ({ isAnswer, card }) => (
  <dl className={`answer-option ${isAnswer ? 'answer-option--answer' : ''}`}>
    {Object.keys(card).map((info) => (
      <span className="answer-option__item" key={info}>
        <dt className="answer-option__title">{info}</dt>
        <dd className="answer-option__value"><CardItemValue value={ card[info] }/></dd>
      </span>
    ))}
  </dl>
);

export default ({
  cards = [], answerId, showAnswer, ...props
}) => (
    <section className={`answer ${showAnswer ? 'visible' : 'hidden'}`} { ...props }>
      <AnswerOption isAnswer={answerId === cards[0].url} card={cards[0]}/>
      <AnswerOption isAnswer={answerId === cards[1].url} card={cards[1]}/>
    </section>
);
