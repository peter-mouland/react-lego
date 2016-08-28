import { expect } from '../../../../tests/support/test.helper';
import { randomRange, getQuestionAndAnswer } from './game-helpers';

describe('game helpers', () => {
  describe('randomRange', ()=>{
    it('should return an array', () => {
      expect(Array.isArray(randomRange(0,0,0))).to.equal(true, 'is not an array')
    });

    it('should return an array length matching the 3rd argument', () => {
      const arrLength = 1;
      expect(randomRange(0,0, arrLength).length).to.equal(arrLength);
    });

    it('should return a known value when from and to args match', () => {
      const arrLength = 1;
      const fromTo = 1;
      expect(randomRange(fromTo, fromTo, arrLength)[0]).to.equal(fromTo)
    });

    it('returns all values when range matches length', () => {
      const range = randomRange(0, 1, 2);
      expect(range.length).to.equal(2);
      expect(range.includes(0)).to.equal(true, `${range} does not include 0`);
      expect(range.includes(1)).to.equal(true, `${range} does not include 1`);

      const range2 = randomRange(0, 2, 3);
      expect(range2.length).to.equal(3);
      expect(range2.includes(0)).to.equal(true, `${range2} does not include 0`);
      expect(range2.includes(1)).to.equal(true, `${range2} does not include 1`);
      expect(range2.includes(2)).to.equal(true, `${range2} does not include 2`);

      const range3 = randomRange(1, 3, 3);
      expect(range3.length).to.equal(3);
      expect(range3.includes(1)).to.equal(true, `${range3} does not include 0`);
      expect(range3.includes(2)).to.equal(true, `${range3} does not include 1`);
      expect(range3.includes(3)).to.equal(true, `${range3} does not include 2`);
    });
  });

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
  })
});
