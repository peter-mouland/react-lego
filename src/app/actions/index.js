import { fetch } from '../utils';

export const FETCH_BOOK = 'FETCH_BOOK';

const getBookQuery = `
query (£bookTitle: String!) { getBook(bookTitle: $bookTitle){ 
  answerId, cards { ...cardInfo }, question, answer } 
} 
`;

export function fetchBook(bookTitle) {
  return {
    type: FETCH_BOOK,
    payload: fetch.graphQL(getBookQuery, { bookTitle })
  };
}
