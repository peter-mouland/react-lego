import { findRoute } from '../../src/app/routes';

module.exports = {
  '@tags': ['staging', 'production'],
  before(browser) {
    browser.loadPage(findRoute('homepage').path, { selector : '#homepage' });
  },
  after (browser, done) {
    browser.end().perform(() => done())
  },

  ['homepage layout should include nav, footer and content blocks']({ page }) {
    const Home = page.home();
    Home.expect.section('@page').to.be.present;
    Home.expect.section('@main').to.be.present;
    Home.expect.section('@nav').to.be.present;
    Home.expect.section('@content').to.be.present;
    Home.expect.section('@footer').to.be.present;
  },

  ['homepage can navigate to the game page']({ page }) {
    page.home().section.nav.click('@gameLink');
    page.game().expect.section('@page').to.be.present;
  }
};
