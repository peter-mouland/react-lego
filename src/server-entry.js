require('babel-core/register')({
  only: [/tests/, /src/, /config/]
});
require('babel-polyfill');
const hook = require('node-hook').hook;
hook('.scss', () => '');

require('./config/environment');

const server = require('./server/server');

server.listen(process.env.PORT, () => {
  console.log(`listening at http://localhost:${process.env.PORT}`); // eslint-disable-line
});
