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

  });

  it('returns an object containg key value pairs of the words and a word count', () => {
  });

});
