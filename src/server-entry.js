require('babel-polyfill');
require('./config/environment');
const server = require('./server/server');

server.listen(process.env.PORT, () => {
  console.log(`listening at http://localhost:${process.env.PORT}`); // eslint-disable-line
});
