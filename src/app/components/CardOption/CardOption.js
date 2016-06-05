import React from 'react';

import './cardOption.scss';

export default ({ onClick, attempt, children, answer, showAnswer }) => {
  const classNames = ['card__option'];
  if (attempt === children) {
    classNames.push('card__option--selected');
  }
  if (showAnswer) {
    classNames.push(answer === children ? 'card__option--correct' : 'card__option--wrong');
  }

  return <li className={classNames.join(' ')} onClick={onClick} >{children}</li>;
};
