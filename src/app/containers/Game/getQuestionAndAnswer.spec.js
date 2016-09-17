import { expect } from '../../../../tests/support/test.helper';
import getQuestionAndAnswer from './getQuestionAndAnswer';

describe('getQuestionAndAnswer', ()=>{
  const fakeCard1 = {
    name: 'card1',
    key1: 'unknown',
    key2: 2,
    key3: 3,
    key4: 4,
    key5: 5,
    height: 6,
    key7: 'unknown',
  };
  const fakeCard2 = {
    name: 'card2',
    key1: 11,
    key2: 21,
    key3: 31,
    key4: 4,
    key5: 5,
    height: 61,
    key7: 'unknown',
  };
  const cards = [fakeCard1, fakeCard2];

  it('returns an empty object when no cards are passed', () => {
    expect(getQuestionAndAnswer({cards: []})).to.equal(null)
  });

  it('should return a question which matches the answer and fact', () => {
    expect(getQuestionAndAnswer({ cards, answerInt: 0, factInt: 2 }).question).to.equal(`Who's key2 is 2?`)
    expect(getQuestionAndAnswer({ cards, answerInt: 1, factInt: 2 }).question).to.equal(`Who's key2 is 21?`)
    expect(getQuestionAndAnswer({ cards, answerInt: 1, factInt: 3 }).question).to.equal(`Who's key3 is 31?`)
  });

  it('should return taller/smaller when the answer key is height', () => {
    expect(getQuestionAndAnswer({ cards, answerInt: 0, factInt: 6 }).question).to.equal(`Who's height is smaller, card1 or card2?`)
    expect(getQuestionAndAnswer({ cards, answerInt: 1, factInt: 6 }).question).to.equal(`Who's height is taller, card1 or card2?`)
  });

  it('should return answer `both` when both cards matches the answer and fact', () => {
    expect(getQuestionAndAnswer({ cards, answerInt: 0, factInt: 4 }).answer).to.equal(`both`)
    expect(getQuestionAndAnswer({ cards, answerInt: 1, factInt: 4 }).answer).to.equal(`both`)
    expect(getQuestionAndAnswer({ cards, answerInt: 1, factInt: 5 }).answer).to.equal(`both`)
  });

  it('should return answer key `name`', () => {
    expect(getQuestionAndAnswer({ cards, answerInt: 0, factInt: 1 }).answer).to.equal(`card1`)
    expect(getQuestionAndAnswer({ cards, answerInt: 1, factInt: 2 }).answer).to.equal(`card2`)
  });

  it('should return answer unknown when wrong answer value is unknown', () => {
    expect(getQuestionAndAnswer({ cards, answerInt: 0, factInt: 1 }).answer).to.equal(`card1`)
    expect(getQuestionAndAnswer({ cards, answerInt: 1, factInt: 1 }).answer).to.equal(`unknown`)
    expect(getQuestionAndAnswer({ cards, answerInt: 1, factInt: 7 }).answer).to.equal(`both`)
  });

  it('should return the correct answer card', () => {
    expect(getQuestionAndAnswer({ cards, answerInt: 0, factInt: 1 }).answerCard).to.equal(fakeCard1)
    expect(getQuestionAndAnswer({ cards, answerInt: 1, factInt: 1 }).answerCard).to.equal(fakeCard2)
  });
});
