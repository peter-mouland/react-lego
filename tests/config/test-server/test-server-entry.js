require('../../../src/config/environment');
require('../../../src/app/polyfills/node-fetch');

const HttpServer = require('http-server').HttpServer;
let openServer = new HttpServer({ root: 'compiled'});

const startLocalServers = (done) => {
  openServer.listen(process.env.PORT, 'localhost', () => {
    console.log(`Server running on port ${process.env.PORT}`);
    done()
  });
};
const stopLocalServers = (done) => {
  console.log('Closing server...');
  openServer.close(done);
};


module.exports = {
  start: startLocalServers,
  stop: stopLocalServers
};
