const getAnswer = ({ wrongCard, answerCard, answerKey }) => {
  const wrongAnswer = wrongCard[answerKey];
  const answer = answerCard[answerKey];
  switch (true) {
    case (wrongAnswer === 'unknown' && wrongAnswer !== answer) :
      return 'unknown';
    case (wrongAnswer === answer) :
      return 'both';
    default :
      return answerCard.name;
  }
};

export default ({ cards, answerInt, factInt }) => {
  if (!cards.length) return null;

  const wrongCard = cards[1 - answerInt];
  const answerCard = cards[answerInt];
  const answerKey = Object.keys(answerCard)[factInt];
  const fact = answerCard[answerKey];
  const extra = fact > wrongCard[answerKey] ? 'taller' : 'smaller';
  const answerText = answerKey === 'height'
    ? `${extra}, ${cards[0].name} or ${cards[1].name}`
    : fact;
  const question = `Who's ${answerKey} is ${answerText}?`;
  const answer = getAnswer({ wrongCard, answerCard, answerKey });
  return { question, answer, answerCard };
};
