import bodyparser from 'koa-bodyparser';
import Router from 'koa-router';
import { graphql } from 'graphql';

import handleError from '../middleware/handle-error';
import schema, { root } from './graphql/schema';

const router = new Router({ prefix: '/graphql' });

router.use(handleError());
router.use(bodyparser({
  enableTypes: ['text'],
  extendTypes: {
    text: ['application/graphql'] // will parse application/x-javascript type body as a JSON string
  }
}));

router.get('/', (ctx) => {
  ctx.type = 'json';
  ctx.status = 200;
  ctx.body = { status: 'healthy' };
});

router.post('/', async (ctx) => {
  const { request, context, query } = ctx;
  await graphql(schema, request.body, root, context, query)
    .then((result) => {
      ctx.status = 200;
      ctx.type = 'json';
      ctx.body = result.data;
    });
});

export default router;
