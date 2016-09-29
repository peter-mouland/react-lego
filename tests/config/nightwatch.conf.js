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

const { app, bundler, compiler } = require('../../src/server/server.js');
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
      bundler.listen(8080, 'localhost', () => {
        console.log('Bundling project, please wait...');
      });

      compiler.plugin('done', () => {
        openServer = app.listen(process.env.PORT, () => {
          console.log(`Server running on port ${process.env.PORT}`);
          done()
        });
      });
    },
    after: function(done) {
      return openServer.close(() => {
        bundler.close(done);
      });
    }
  };
  settings.test_settings.default.desiredCapabilities['browserstack.user'] = argv.bsuser || process.env.BROWSERSTACK_USER;
  settings.test_settings.default.desiredCapabilities['browserstack.key'] = argv.bskey || process.env.BROWSERSTACK_KEY;
  settings.test_settings.default.desiredCapabilities['build'] = buildString;
  return settings;
})(require('./nightwatch.json'));
