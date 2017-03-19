import {findRoute} from '../../src/app/routes';
let homePage;
let pageLayout;

module.exports = {
  '@tags': ['staging', 'production'],
  before(browser) {
    homePage = browser.page.homepage();
    pageLayout = browser.page.layout();
    browser.pageLoaded(findRoute('game').path, {selector: '#game'});
  },

  ['expects a hand to be loaded by the server'](browser) {
    browser.expect.element('.question').to.be.present;
  },

  ['can load a new hand'](browser) {
    browser.expect.element('.question__options').to.be.present;
    browser.getText('.question__options', (text) => {
      browser
        .safeClick('.game__btn--deal')
        .waitForElementNotPresent('.loading', 1000)
        .expect.element('.question__options').text.to.not.equal(text.value);
    });
  }
};
