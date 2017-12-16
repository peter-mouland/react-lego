let config = {};

const setConfig = () => {
// explicitly check vars so that webpack can help us
  if (process.env.ENV === 'dev') {
    // set dev envs here
    if (typeof process.env.NODE_ENV === 'undefined') { process.env.NODE_ENV = 'development'; }
  }
  // set prod / default env here
  if (typeof process.env.NODE_ENV === 'undefined') { process.env.NODE_ENV = 'production'; }
  if (typeof process.env.PORT === 'undefined') { process.env.PORT = 3000; }

  config = {
    api: {
      label: 'SWAPI',
      host: 'https://swapi.co/api/',
      homepage: 'https://www.swapi.com'
    },
    NODE_ENV: process.env.NODE_ENV,
    PORT: process.env.PORT
  };
};

if (Object.keys(config).length === 0) {
  setConfig();
}

module.exports = config;
