const debug = require('debug');

const log = debug('lego: Environment:');
let config = {};

const setConfig = () => {
// explicitly check vars so that webpack can help us
  if (process.env.ENV === 'dev') {
    // set dev envs here
    if (!process.env.NODE_ENV) { process.env.NODE_ENV = 'development'; }
  } else if (process.env.ENV === 'test') {
    if (!process.env.CTM_BASE_URL_BOOK) { process.env.CTM_BASE_URL_BOOK = 'localhost:5000/'; }
  }

  // set prod / default env here
  if (!process.env.NODE_ENV) { process.env.NODE_ENV = 'production'; }
  if (!process.env.DEBUG) { process.env.DEBUG = 'lego:*'; }
  if (!process.env.PORT) { process.env.PORT = 3000; }
  if (!process.env.CTM_BASE_URL_BOOK) { process.env.CTM_BASE_URL_BOOK = 'http://www.loyalbooks.com/download/text/'; }

  debug.enable(process.env.DEBUG);

  config = {
    NODE_ENV: process.env.NODE_ENV,
    DEBUG: process.env.DEBUG,
    PORT: process.env.PORT,
    CTM_BASE_URL_BOOK: process.env.CTM_BASE_URL_BOOK
  };
};

if (Object.keys(config).length === 0) {
  setConfig();
  log(config);
}

module.exports = config;
