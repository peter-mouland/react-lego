import { buildSchema } from 'graphql';

// maybe use babel-plugin-import-glob  in the future
import bookSchema, { getBook, bookQuery } from './book';

// The root provides the top-level API endpoints
export const root = {
  getBook,
};

export default buildSchema(`
  ${bookSchema}
  
  type Query {
    ${bookQuery}
  }
`);

