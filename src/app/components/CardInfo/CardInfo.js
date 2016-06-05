import React from 'react';

import './cardInfo.scss';

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


export default ({ answer, card }) => (
  <dl className={`card-info ${answer ? 'card-info--answer' : ''}`}>
    {Object.keys(card).map(info => (
      <span className="card-info__item" key={info}>
        <dt className="card-info__title">{info}</dt>
        <dd className="card-info__value"><CardItemValue value={ card[info] }/></dd>
      </span>
    ))}
  </dl>
);
