import Chance from 'chance';

import { expect, sinon } from '../../../../../tests/config/test.helper';
import { Book, formatBookTitle } from './';
import { fetch } from '../../../../../src/app/utils';

const sandbox = sinon.sandbox.create();
const chance = new Chance();
let stub;
let promise;
let title;

describe.only('Book', ()=>{

  beforeEach(()=>{
    sandbox.stub(fetch, 'graphQL', () => promise);
    title = chance.sentence();
  });

  afterEach(()=>{
    sandbox.restore();
  });

  it('should return a book title without spaces', () => {
    expect(new Book(title).title).not.to.contain(` `);
  });
  it('should return a formatted book title', () => {
    expect(new Book(title).title).to.equal(formatBookTitle(title));
  });

  it('doesnt fail without bookText being passed', () => {
    expect(new Book(title).wordCount).to.equal(0);
  });

  it('should return a word count', () => {
    const bookText = 'one, two, miss a few, one hundred';
    expect(new Book(title, bookText).wordCount).to.equal(7);
  });

  it('should return the raw text', () => {
    const bookText = chance.sentence();
    expect(new Book(title, bookText).raw).to.equal(bookText);

  });

  context('returns an object containing key value pairs of the words and a word count,', () =>{
    it(' ignoring commas', () => {
      const bookText = 'one, two, miss a few, one hundred';
      const wordCounts = new Book(title, bookText).wordCounts;
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
      const wordCounts = new Book(title, bookText).wordCounts;
      expect(Object.keys(wordCounts).length).to.equal(8);
      expect(wordCounts.the).to.equal(2);
      expect(wordCounts.quick).to.equal(1);
    });
  })

});
