import koaBody from 'koa-body';
import Router from 'koa-router';

import getGame from './game';

const parseBody = koaBody();
const router = new Router({ prefix: '/api' });

router.get('/', (ctx) => {
  ctx.type = 'json';
  ctx.status = 200;
  ctx.body = { status: 'healthy' };
});

router.get('/game/:gameType(people|films)/:card1/:card2', parseBody, async (ctx) => {
  const { gameType, card1, card2 } = ctx.params;
  ctx.status = 200;
  ctx.type = 'json';
  ctx.body = await getGame({ gameType, card1, card2 });
});

export default router;
