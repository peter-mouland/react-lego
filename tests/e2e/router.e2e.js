import { routes } from '../../src/app/routes';

module.exports = {
  before(browser) {
    browser.pageLoaded(routes.homepage.path, 'body');
  },
  after(browser) {
    browser.end();
  },

  ['Navigates displaying the route in the address bar (using the correct history API)'](browser) {
    browser.safeClick('[href="/search"]');
    browser.expect.element('#search').to.be.present;
    browser.assert.urlEquals(`${browser.globals.TARGET_PATH}/search`);
  }
};
