const debug = require('debug');

const log = debug('lego: Environment:');
let config = {};

const setConfig = () => {
// explicitly check vars so that webpack can help us
  if (process.env.ENV === 'dev') {
    // set dev envs here
    if (typeof process.env.NODE_ENV === 'undefined') { process.env.NODE_ENV = 'development'; }
  }

  if (process.env.NODE_ENV === 'test') {
    // set test envs here
    process.env.DEBUG = false;
  }

  // set prod / default env here
  if (typeof process.env.NODE_ENV === 'undefined') { process.env.NODE_ENV = 'production'; }
  if (typeof process.env.DEBUG === 'undefined') { process.env.DEBUG = 'lego:*'; }
  if (typeof process.env.PORT === 'undefined') { process.env.PORT = 3000; }

  if (process.env.DEBUG) debug.enable(process.env.DEBUG);

  config = {
    api: {
      label: 'SWAPI',
      host: 'https://swapi.co/api/',
      homepage: 'https://www.swapi.com'
    },
    NODE_ENV: process.env.NODE_ENV,
    DEBUG: process.env.DEBUG,
    PORT: process.env.PORT
  };
};

if (Object.keys(config).length === 0) {
  setConfig();
  log(config);
}

module.exports = config;
