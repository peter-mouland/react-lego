const debug = require('debug');

const setEnvs = {};
const setEnvDefault = (key, val) => {
  if (!process.env[key]) {
    process.env[key] = val;
  }
  setEnvs[key] = process.env[key];
};

setEnvDefault('DEBUG', 'lego:*');
setEnvDefault('NODE_ENV', 'development');
setEnvDefault('PORT', 3000);

debug.enable(process.env.DEBUG);
const log = debug('lego: Environment:');

log(setEnvs);
