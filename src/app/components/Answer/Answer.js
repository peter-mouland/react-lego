import React from 'react';

import './answer.scss';

const CardItemValue = ({ value }) => {
  const values = [].concat(value);
  const props = { className: 'card-item-value' };
  return (
    <div >{
      values
        .map((val, i) => {
          props.key = `${i}-${val}`;
          return val.indexOf('http://swapi.co/api/') === 0
            ? <a href={val} target="_blank" { ...props }>{val.replace('http://swapi.co/api/', '')}</a>
            : <span { ...props }>{val}</span>;
        })
    }</div>
  );
};

const AnswerOption = ({ answer, card }) => (
  <dl className={`answer-option ${answer ? 'answer-option--answer' : ''}`}>
    {Object.keys(card).map((info) => (
      <span className="answer-option__item" key={info}>
        <dt className="answer-option__title">{info}</dt>
        <dd className="answer-option__value"><CardItemValue value={ card[info] }/></dd>
      </span>
    ))}
  </dl>
);

export default ({ cards, answerCard, showAnswer, ...props }) => (
  !cards.length ? null : (
    <section className={`answer ${showAnswer ? 'visible' : 'hidden'}`} { ...props }>
      <AnswerOption answer={answerCard === cards[0]} card={cards[0]}/>
      <AnswerOption answer={answerCard === cards[1]} card={cards[1]}/>
    </section>
  )
);
