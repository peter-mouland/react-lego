import { findRoute } from '../../src/app/routes';

module.exports = {
  '@tags': ['staging', 'production'],
  before(browser) {
    browser.pageLoaded(findRoute('homepage').path, { selector : '#homepage' });
  },

  // if this test fails  because the url ends with '/', then the js may have an error.
  // This test, with BrowserStack, helped catch ie10/11 errors,
  // being caused by a cheeky Object.Assign being used in the router.
  ['Navigates displaying the route in the address bar (using the correct history API)'](browser) {
    browser.safeClick('[href="/game/"]');
    browser.expect.element('#game').to.be.present;
    browser.assert.urlEquals(`${browser.globals.TARGET_PATH}/game/`);
  }
};
