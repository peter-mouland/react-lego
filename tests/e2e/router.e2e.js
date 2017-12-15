import { findRoute } from '../../src/app/routes';

module.exports = {
  '@tags': ['staging', 'production'],
  before({ loadPage }) {
    loadPage(findRoute('homepage').path, { selector : '#homepage' });
  },
  after (browser, done) {
    browser.end().perform(() => done())
  },

  // if this test fails  because the url ends with '/', then the js may have an error.
  // This test, with BrowserStack, helped catch ie10/11 errors,
  // being caused by a cheeky Object.Assign being used in the router.
  ['Navigates displaying the route in the address bar (using the correct history API)']({ page, assert, globals }) {
    page.game().section.nav.click('@gameLink');
    page.game().expect.element('@page').to.be.present;
    assert.urlEquals(`${globals.TARGET_PATH}/game/`);
  }
};
