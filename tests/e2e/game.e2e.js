import {findRoute} from '../../src/app/routes';

module.exports = {
  '@tags': ['staging', 'production'],
  before({ loadPage, page: { game } }) {
    loadPage(findRoute('homepage').path, {selector: '#homepage'})
    game().section.nav.click('@gameLink');
  },

  after (browser, done) {
    browser.end().perform(() => done())
  },

  ['expects a hand to be loaded by the server']({ page: { game } }) {
    game().expect.element('@question').to.be.present;
  },

  ['can load a new hand'](browser) {
    const { page: { game } } = browser;
    game().expect.element('@questionOptions').to.be.present;
    game().getText('@questionOptions', (text) => {
      game()
        .click('@dealBtn')
        .waitForElementNotPresent('@loading', 1500)
        .expect.element('@questionOptions').text.to.not.equal(text.value);
    });
  }
};
