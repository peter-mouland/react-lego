/* eslint-disable no-param-reassign */
// import { GraphQLScalarType } from 'graphql/type';

import { json } from '../../../../app/utils';
import config from '../../../../config/environment';

export const formatBookTitle = (title) => title.replace(/ /ig, '-');
const getBookText = (title) => json.get(`${config.CTM_BASE_URL_BOOK}${formatBookTitle(title)}`);

class WordCounts {
  constructor(text) {
    const wordsArray = text.toLowerCase().split(/,* /);
    return wordsArray.reduce((prev, curr) => {
      const word = curr.trim();
      if (word && prev[word]) {
        prev[word] += 1;
      } else if (word) {
        prev[word] = 1;
      }
      return prev;
    }, {});
  }
}

const schema = (`
  scalar WordCounts
  type Book {
    bookTitle: String!,
    text: String!,
    wordCount: Int,
    wordCounts: WordCounts
  }
`);

export const bookQuery = `
  getBook(bookTitle: String): Book
`;

export class Book {
  constructor(bookTitle, bookText = '') {
    this.bookTitle = bookTitle;
    this.raw = bookText;
  }

  get wordCount() {
    return this.raw.split(' ').filter((word) => !!word).length;
  }

  get title() {
    return formatBookTitle(this.bookTitle);
  }

  get wordCounts() {
    return new WordCounts(this.raw);
  }
}

export const getBook = ({ bookTitle }) => getBookText(bookTitle)
  .then((text) => new Book(bookTitle, text));

export default schema;
