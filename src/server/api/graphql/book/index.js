import { GraphQLScalarType } from 'graphql/type';

import { json } from '../../../../app/utils';
import config from '../../../../config/environment';

export const formatBookTitle = (title) => title.replace(/ /ig, '-');
const getBookText = (title) => json.get(`${config.CTM_BASE_URL_BOOK}${formatBookTitle(title)}`);

const WordCounts = new GraphQLScalarType({
  name: 'WordCounts',
  serialize(value) {
    return value;
  },
});

const schema = (`
  scalar WordCounts
  type Book {
    bookTitle: String!,
    text: String!,
    totalWordCount: Int,
    individualWordCount: WordCounts
  }
`);

export const bookQuery = `
  getBook(bookTitle: String): Book
`;

export class Book {
  constructor(bookTitle, bookText) {
    this.bookTitle = bookTitle;
    this.raw = bookText;
  }

  get title() {
    return formatBookTitle(this.bookTitle);
  }

  get individualWordCount() {
    return new WordCounts(this.raw);
  }
}

export const getBook = ({ bookTitle }) => getBookText(bookTitle)
  .then((text) => new Book(bookTitle, text));

export default schema;
