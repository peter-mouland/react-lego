import { findRoute } from '../../src/app/routes';
let homePage;
let pageLayout;

module.exports = {
  '@tags': ['staging', 'production'],
  before(browser) {
    homePage = browser.page.homepage();
    pageLayout = browser.page.layout();
    browser.pageLoaded(findRoute('homepage').path, { selector : '#homepage' });
  },

  ['homepage layout should include nav, footer and content blocks'](browser) {
    browser.expect.element('.layout.layout--main').to.be.present;
    browser.expect.element('.layout__nav').to.be.present;
    browser.expect.element('.layout__content').to.be.present;
    browser.expect.element('.layout__footer').to.be.present;
  },

  ['homepage can navigate to the game page'](browser) {
    browser.safeClick('[href="/game/"]');
    browser.expect.element('#game').to.be.present;
  }
};
