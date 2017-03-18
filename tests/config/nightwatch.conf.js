/* eslint-disable */
const argv = require('yargs')
  .usage('Usage: $0 --target=[string] --sha=[string]')
  .argv;
process.env.PORT = 3210;
const testServer = require('./test-server/test-server-entry');

const TARGET_PATH = argv.target || `http://localhost:${process.env.PORT}`;
const needLocalServer = TARGET_PATH.indexOf('localhost') > -1;
const noop = (done) => { done(); };

module.exports = (function(settings) {
  var buildString = "";
  if (argv.sha) {
    buildString += argv.sha
  } else {
    buildString += 'local ' + Date.now();
    buildString = buildString.substring(0, buildString.length - 4);
  }

  settings.test_settings.default.globals = {
    TARGET_PATH : TARGET_PATH,
    before:  needLocalServer ? testServer.start : noop,
    after: needLocalServer ? testServer.stop : noop,
    afterEach: function (client, done) {
      var weHaveFailures = client.currentTest.results.errors > 0 || client.currentTest.results.failed > 0;
      if (weHaveFailures && !client.sessionId) {
        console.log('Session already ended.');
        done();
        return;
      }
      if (weHaveFailures) {
        client.saveScreenshot(`${client.currentTest.name}.png`, function(result) {
          if (!result || result.status !== 0)  {
            console.log('Error saving screenshot...', result);
          }
          client.deleteCookies().end(done);
        });
      } else {
        client.deleteCookies().end(done);
      }
    }
  };
  settings.test_settings.default.desiredCapabilities['browserstack.local'] = needLocalServer;
  settings.test_settings.default.desiredCapabilities['browserstack.user'] = argv.bsuser || process.env.BROWSERSTACK_USER;
  settings.test_settings.default.desiredCapabilities['browserstack.key'] = argv.bskey || process.env.BROWSERSTACK_KEY;
  settings.test_settings.default.desiredCapabilities['build'] = buildString;
  return settings;
})(require('./nightwatch.json'));
