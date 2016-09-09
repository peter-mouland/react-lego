import express from 'express';
import debug from 'debug';
import bodyParser from 'body-parser';

import fetchCards from './fetch-cards';

const log = debug('lego:api/index');
const apiRouter = new express.Router();
const sendStatus = (code, res, results) => res.status(code).send(results);

apiRouter.use(bodyParser.json({ limit: '1mb' }));
apiRouter.use(bodyParser.urlencoded({ limit: '1mb', extended: true }));

function errorHandler(err, req, res) {
  log(err);
  const e = new Error();
  e.name = err.name;
  e.message = err.message;
  e.stackd = err.stack;
  res.status(err.status || 500).json({ error: e });
  res.end();
}

apiRouter.get('/game/:gameType(people|films)/:card1/:card2', (req, res) => {
  const cards = [req.params.card1, req.params.card2];
  fetchCards(req.params.gameType, cards)
    .then((results) => sendStatus(200, res, results))
    .catch((e) => sendStatus(500, res, e));
});

apiRouter.use('*', (req, res) => {
  const e = new Error();
  e.name = 'APIError';
  e.message = 'API Route Not Found';
  res.status(404).json({ error: e });
  res.end();
});

apiRouter.use(errorHandler);

export default apiRouter;
