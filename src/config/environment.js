const debug = require('debug');
debug.enable(process.env.DEBUG);
const log = debug('lego: Environment:');

log({
  PORT: process.env.PORT,
  NODE_ENV: process.env.NODE_ENV
});

if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = 'development';
}

if (!process.env.PORT) {
  process.env.PORT = 3000;
}

log({
  PORT: process.env.PORT,
  NODE_ENV: process.env.NODE_ENV
});
