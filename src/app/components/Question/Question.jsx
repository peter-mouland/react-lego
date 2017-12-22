/* eslint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions, max-len */
import React from 'react';
import PropTypes from 'prop-types';

import './question.scss';

const QuestionOption = ({
  onClick, attempt, children, answer, showAnswer
}) => {
  const classNames = ['question__option'];
  if (attempt === children) {
    classNames.push('question__option--selected');
  }
  if (showAnswer) {
    classNames.push(answer === children ? 'question__option--correct' : 'question__option--wrong');
  }
  return <li className={classNames.join(' ')} onClick={onClick} >{children}</li>;
};

QuestionOption.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.string.isRequired,
  attempt: PropTypes.node,
  answer: PropTypes.node,
  showAnswer: PropTypes.bool,
};

QuestionOption.defaultProps = {
  attempt: null,
  answer: null,
  showAnswer: false,
};

const Question = ({
  children, showAnswer, answer, cards, attempt, onClick, ...props
}) => {
  if (!cards.length) return null;

  const options = [cards[0].name, cards[1].name, 'both', 'unknown'];
  const optionProps = { answer, attempt, showAnswer };

  return (
    <section className="question" {...props}>
      <p className="question__text">{children}</p>
      <ul className="question__options">
        {options.map((option) => (
          <QuestionOption {...optionProps} onClick={() => onClick(option)} key={option}>
            {option}
          </QuestionOption>
        ))}
      </ul>
    </section>
  );
};

Question.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.string.isRequired,
  attempt: PropTypes.node,
  answer: PropTypes.node,
  showAnswer: PropTypes.bool,
  cards: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string
  })),
};

Question.defaultProps = {
  attempt: null,
  answer: null,
  showAnswer: false,
  cards: [],
};

export default Question;

