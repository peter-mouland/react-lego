import { expect } from '../../../tests/config/test.helper';
import Chance from 'chance';

import * as reducers from './';
import * as actions from '../actions';

const chance = new Chance();
let fakeState;
let fakeKey;
let fakeValue;

describe('reducers/index', () => {

  beforeEach(()=>{
    fakeKey = chance.word();
    fakeValue = chance.word();
    fakeState = { [fakeKey]: fakeValue };
  });

  context('book reducer', () => {
    it('will always return given state by default', () => {
      expect(reducers.book(fakeState, {})).to.equal(fakeState, 'State should always be returned');
    });

    it('will return loading state if action is pending', () => {
      const type = `${actions.FETCH_BOOK}_PENDING`;
      const result = reducers.book(fakeState, { type });
      expect(result.loading).to.deep.equal(true, 'State should be loading');
      expect(result[fakeKey]).to.deep.equal(fakeValue, 'State should still contain existing keys');
    });

    it('will return update state and payload if action is fulfilled', () => {
      const type = `${actions.FETCH_BOOK}_FULFILLED`;
      const status = chance.integer();
      const payload = { getBook: { message: chance.sentence(), wordCounts: {} } };
      const result = reducers.book(fakeState, { type, status, payload });
      expect(result.loading).to.deep.equal(false, 'State should be updated');
      expect(result[fakeKey]).to.deep.equal(fakeValue, 'State should be loading');
      expect(result.status).to.deep.equal(status, 'State should be updated');
      expect(result.book).to.deep.equal(payload.getBook, 'State should be updated');
    });
  });
  context('returns an object containing key value pairs of the words and a word count,', () =>{
    it(' ignoring commas', () => {
      const bookText = 'one, two, miss a few, one hundred';
      const type = `${actions.FETCH_BOOK}_FULFILLED`;
      const status = chance.integer();
      const payload = { getBook: { text: bookText } };
      const result = reducers.book(fakeState, { type, status, payload });
      const wordCounts = result.book.wordCounts;
      expect(Object.keys(wordCounts).length).to.equal(6);
      expect(wordCounts.one).to.equal(2);
      expect(wordCounts.two).to.equal(1);
      expect(wordCounts.miss).to.equal(1);
      expect(wordCounts.a).to.equal(1);
      expect(wordCounts.few).to.equal(1);
      expect(wordCounts.hundred).to.equal(1);
    });

    it('ignoring case', () => {
      const bookText = 'The quick brown fox jumps over the lazy dog';
      const type = `${actions.FETCH_BOOK}_FULFILLED`;
      const status = chance.integer();
      const payload = { getBook: { text: bookText } };
      const result = reducers.book(fakeState, { type, status, payload });
      const wordCounts = result.book.wordCounts;
      expect(Object.keys(wordCounts).length).to.equal(8);
      expect(wordCounts.the).to.equal(2);
      expect(wordCounts.quick).to.equal(1);
    });

    it('counts hyphenated words ', () => {
      const bookText = 'the front-end developer using back-end tools';
      const type = `${actions.FETCH_BOOK}_FULFILLED`;
      const status = chance.integer();
      const payload = { getBook: { text: bookText } };
      const result = reducers.book(fakeState, { type, status, payload });
      const wordCounts = result.book.wordCounts;
      expect(Object.keys(wordCounts).length).to.equal(6);
      expect(wordCounts['front-end']).to.equal(1);
      expect(wordCounts.front).to.equal(undefined);
      expect(wordCounts['back-end']).to.equal(1);
      expect(wordCounts.back).to.equal(undefined);
    });

    it('ignores multiple types of punctuation ', () => {
      const bookText = `a word; another word. what is going on?`;
      const type = `${actions.FETCH_BOOK}_FULFILLED`;
      const status = chance.integer();
      const payload = { getBook: { text: bookText } };
      const result = reducers.book(fakeState, { type, status, payload });
      const wordCounts = result.book.wordCounts;
      expect(Object.keys(wordCounts).length).to.equal(7);
      expect(wordCounts.word).to.equal(2);
      expect(wordCounts.what).to.equal(1);
    });

    context('returns an object containing key value pairs of the words and a word count,', () =>{
      it(' ignoring commas', () => {
        const bookText = 'one, two, miss a few, one hundred';
        const type = `${actions.FETCH_BOOK}_FULFILLED`;
        const status = chance.integer();
        const payload = { getBook: { text: bookText } };
        const result = reducers.book(fakeState, { type, status, payload });
        const wordCounts = result.book.wordCounts;
        expect(Object.keys(wordCounts).length).to.equal(6);
        expect(wordCounts.one).to.equal(2);
        expect(wordCounts.two).to.equal(1);
        expect(wordCounts.miss).to.equal(1);
        expect(wordCounts.a).to.equal(1);
        expect(wordCounts.few).to.equal(1);
        expect(wordCounts.hundred).to.equal(1);
      });

      it('ignoring case', () => {
        const bookText = 'The quick brown fox jumps over the lazy dog';
        const type = `${actions.FETCH_BOOK}_FULFILLED`;
        const status = chance.integer();
        const payload = { getBook: { text: bookText } };
        const result = reducers.book(fakeState, { type, status, payload });
        const wordCounts = result.book.wordCounts;
        expect(Object.keys(wordCounts).length).to.equal(8);
        expect(wordCounts.the).to.equal(2);
        expect(wordCounts.quick).to.equal(1);
      });

      it('counts hyphenated words ', () => {
        const bookText = 'the front-end developer using back-end tools';
        const type = `${actions.FETCH_BOOK}_FULFILLED`;
        const status = chance.integer();
        const payload = { getBook: { text: bookText } };
        const result = reducers.book(fakeState, { type, status, payload });
        const wordCounts = result.book.wordCounts;
        expect(Object.keys(wordCounts).length).to.equal(6);
        expect(wordCounts['front-end']).to.equal(1);
        expect(wordCounts.front).to.equal(undefined);
        expect(wordCounts['back-end']).to.equal(1);
        expect(wordCounts.back).to.equal(undefined);
      });

      it('ignores multiple types of punctuation ', () => {
        const bookText = `a word; another word. what is going on?`;
        const type = `${actions.FETCH_BOOK}_FULFILLED`;
        const status = chance.integer();
        const payload = { getBook: { text: bookText } };
        const result = reducers.book(fakeState, { type, status, payload });
        const wordCounts = result.book.wordCounts;
        expect(Object.keys(wordCounts).length).to.equal(7);
        expect(wordCounts.word).to.equal(2);
        expect(wordCounts.what).to.equal(1);
      });
    })

  })

});
