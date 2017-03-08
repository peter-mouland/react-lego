const debug = require('debug');

const setEnvs = {};
const setEnvDefault = (key, val) => {
  if (!process.env[key]) {
    process.env[key] = val;
  }
  setEnvs[key] = process.env[key];
};

setEnvDefault('DEBUG', 'lego:*');
setEnvDefault('PORT', 3000);

debug.enable(process.env.DEBUG);
const log = debug('lego: Environment:');

// explicitly check vars that webpack can help us with
if (!process.env.NODE_ENV) { setEnvDefault('NODE_ENV', 'development'); }

log(setEnvs);

module.exports = setEnvs;
