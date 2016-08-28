import React from 'react';

import './question.scss';

const QuestionOption = ({ onClick, attempt, children, answer, showAnswer }) => {
  const classNames = ['question__option'];
  if (attempt === children) {
    classNames.push('question__option--selected');
  }
  if (showAnswer) {
    classNames.push(answer === children ? 'question__option--correct' : 'question__option--wrong');
  }
  return <li className={classNames.join(' ')} onClick={onClick} >{children}</li>;
};

export default class Question extends React.Component {

  render() {
    const { children, showAnswer, answer, cards, attempt, onClick, ...props } = this.props;
    if (!cards.length) return null;

    const options = [cards[0].name, cards[1].name, 'both', 'unknown'];
    const optionProps = { answer, attempt, showAnswer };

    return (
      <section className="question" { ...props }>
        <p>{children}</p>
        <ul className="question__options">
          {options.map((option, i) => (
            <QuestionOption {...optionProps} onClick={() => onClick(option)} key={i}>
              {option}
            </QuestionOption>
          ))}
        </ul>
      </section>
    );
  }
}
