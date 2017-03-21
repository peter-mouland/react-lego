import { buildSchema } from 'graphql';

// maybe use babel-plugin-import-glob  in the future
import handSchema, { getHand, handQuery } from './game';

// The root provides the top-level API endpoints
export const root = {
  getHand,
};

export default buildSchema(`
  ${handSchema}
  
  type Query {
    ${handQuery}
  }
`);

