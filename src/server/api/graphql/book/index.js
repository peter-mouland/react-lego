import fs from 'fs';
import path from 'path';

// import { json } from '../../../../app/utils';
// import config from '../../../../config/environment';

export const formatBookTitle = (title) => title.replace(/ /ig, '-');
// const getBookText = (title) => json.get(`${config.CTM_BASE_URL_BOOK}${formatBookTitle(title)}`);
const getBookText = (title) => Promise.resolve(fs.readFileSync(path.join(process.cwd(), 'tests', 'functional', 'fixtures', `${formatBookTitle(title)}.txt`), 'utf8'));

const schema = (`
  type Book {
    bookTitle: String!,
    text: String!,
    wordCount: Int
  }
`);

export const bookQuery = `
  getBook(bookTitle: String): Book
`;

export class Book {
  constructor(bookTitle, bookText = '') {
    this.bookTitle = bookTitle;
    this.text = bookText;
  }

  get wordCount() {
    return this.text.split(' ').filter((word) => !!word).length;
  }

  get title() {
    return formatBookTitle(this.bookTitle);
  }
}

export const getBook = ({ bookTitle }) => getBookText(bookTitle)
  .then((text) => new Book(bookTitle, text));

export default schema;
