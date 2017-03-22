import { fetch } from '../utils';

export const FETCH_BOOK = 'FETCH_BOOK';

const getBookQuery = `
query ($bookTitle: String!) { getBook(bookTitle: $bookTitle){ 
  bookTitle text wordCount  
}} 
`;

export function fetchBook({ bookTitle = 'words' }) {
  return {
    type: FETCH_BOOK,
    payload: fetch.graphQL(getBookQuery, { bookTitle })
  };
}
