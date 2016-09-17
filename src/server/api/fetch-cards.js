import debug from 'debug';

import { json } from '../../app/utils';

const log = debug('lego:fetch-cards');
const getCard = (api, cardId) => json.get(`http://swapi.co/api/${api}/${cardId}/`);

export default (api, cards) => Promise.all([getCard(api, cards[0]), getCard(api, cards[1])]);
