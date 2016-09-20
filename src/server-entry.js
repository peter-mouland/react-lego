require('babel-polyfill');
require('./config/environment');
const hook = require('node-hook').hook;

hook('.scss', () => '');
const server = require('./server/server');

server.listen(process.env.PORT, () => {
  console.log(`listening at http://localhost:${process.env.PORT}`); // eslint-disable-line
});
