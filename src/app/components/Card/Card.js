import React from 'react';

import CardInfo from '../CardInfo/CardInfo';
import CardOption from '../CardOption/CardOption';

import './card.scss';

const getAnswer = (props) => {
  const wrongAnswer = props.wrongCard[props.randomFactKey];
  const correctAnswer = props.correctCard[props.randomFactKey];
  switch (true) {
    case (wrongAnswer === 'unknown' && wrongAnswer !== correctAnswer) :
      return 'unknown';
    case (wrongAnswer === correctAnswer) :
      return 'both';
    default :
      return props.correctCard.name;
  }
};

export default class Card extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      showAnswer: false,
      attempt: null,
      answer: getAnswer(props)
    };
    this.setAttempt = this.setAttempt.bind(this);
    this.viewAnswer = this.viewAnswer.bind(this);
  }

  viewAnswer() {
    this.setState({ showAnswer: true });
  }

  setAttempt(attempt) {
    this.setState({ attempt });
  }

  render() {
    const { cards, wrongCard, correctCard, randomFactKey, ...props } = this.props;
    const { showAnswer, attempt, answer } = this.state;
    const card1 = cards[0];
    const card2 = cards[1];
    const optionProps = { answer, attempt, showAnswer };
    let randomFact = correctCard[randomFactKey];

    if (randomFactKey === 'height') {
      const extra = randomFact > wrongCard[randomFactKey] ? 'taller' : 'smaller';
      randomFact = `${extra}, ${card1.name} or ${card2.name}`;
    }

    return (
      <div className="card" { ...props }>
        <div className="card__question">
          <p>Who's {randomFactKey} is {randomFact}?</p>
          <ul className="card__options">
            <CardOption {...optionProps} onClick={() => this.setAttempt(card1.name)} >
              {card1.name}
            </CardOption>
            <CardOption {...optionProps} onClick={() => this.setAttempt(card2.name)} >
              {card2.name}
            </CardOption>
            <CardOption {...optionProps} onClick={() => this.setAttempt('both')}>
              both
            </CardOption>
            <CardOption {...optionProps} onClick={() => this.setAttempt('unknown')} >
              unknown
            </CardOption>
          </ul>
          <button onClick={() => this.viewAnswer('unknown')}>View Answer</button>
        </div>
        <div className={`card__answer ${attempt && showAnswer ? 'visible' : 'hidden'}`}>
          {card1 && <CardInfo answer={correctCard === card1} card={card1}/> }
          {card2 && <CardInfo answer={correctCard === card2} card={card2}/> }
        </div>
      </div>
    );
  }
}
