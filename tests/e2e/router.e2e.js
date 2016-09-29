import { routes } from '../../src/app/routes';

module.exports = {
  '@tags': ['smoke'],
  before(browser) {
    browser.pageLoaded(routes.homepage.path, 'body');
  },
  after(browser) {
    browser.end();
  },

  // if this test fails  because the url ends with '/', then the js may have an error.
  // This test, with BrowserStack, helped catch ie10/11 errors,
  // being caused by a cheeky Object.Assign being used in the router.
  ['Navigates displaying the route in the address bar (using the correct history API)'](browser) {
    browser.safeClick('[href="#/game/"]');
    browser.expect.element('#game').to.be.present;
    browser.assert.urlContains(`${browser.globals.TARGET_PATH}/#/game/?`);
  }
};
