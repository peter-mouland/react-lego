const realFetch = require('node-fetch');

module.exports = (url, options) => {
  const secureUrl = (/^\/\//.test(url))
    ? `https:${url}`
    : url;
  return realFetch.call(this, secureUrl, options);
};

if (!global.fetch) {
  global.fetch = module.exports;
  global.Response = realFetch.Response;
  global.Headers = realFetch.Headers;
  global.Request = realFetch.Request;
}
