import { routes } from '../../src/app/routes';

module.exports = {
  '@tags': ['smoke'],
  before(browser) {
    browser.pageLoaded(routes.homepage.path, 'body');
  },
  after(browser) {
    browser.end();
  },

  ['homepage layout should include nav, footer and content blocks'](browser) {
    browser.expect.element('.layout.layout--main').to.be.present;
    browser.expect.element('.layout__nav').to.be.present;
    browser.expect.element('.layout__content').to.be.present;
    browser.expect.element('.layout__footer').to.be.present;
  },

  ['homepage can navigate to the game page'](browser) {
    browser.safeClick('[href="#/game/"]');
    browser.expect.element('#game').to.be.present;
  }
};
