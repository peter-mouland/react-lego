/* eslint-disable */
const argv = require('yargs')
  .usage('Usage: $0 --target=[string] --sha=[string] --bskey=[string] --bsuser=[string]')
  .argv;
process.env.PORT = 3210;
require('../../src/config/environment');
require('babel-core/register')({
  only: [/src/, /tests/, /config/]
});
require("babel-polyfill");

const testServer = require('../../src/server/server.js');
let openServer;

module.exports = (function(settings) {
  var buildString = "";
  if (argv.sha) {
    buildString += argv.sha
  } else {
    buildString += 'local ' + Date.now();
    buildString = buildString.substring(0, buildString.length - 4);
  }

  settings.test_settings.default.globals = {
    TARGET_PATH : argv.target || `http://localhost:${process.env.PORT}`,
    before: function(done) {
      openServer = testServer.listen(process.env.PORT, () => {
        console.log(`listening at http://localhost:${process.env.PORT}`); // eslint-disable-line
        done()
      });
    },
    after: function(done) {
      return openServer.close(done);
    }
  };
  settings.test_settings.default.desiredCapabilities['browserstack.user'] = argv.bsuser || process.env.BROWSERSTACK_USER;
  settings.test_settings.default.desiredCapabilities['browserstack.key'] = argv.bskey || process.env.BROWSERSTACK_KEY;
  settings.test_settings.default.desiredCapabilities['build'] = buildString;
  return settings;
})(require('./nightwatch.json'));
