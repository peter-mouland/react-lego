// https://github.com/nightwatchjs/nightwatch/wiki/Page-Object-API
// http://nightwatchjs.org/guide#using-page-objects

module.exports = {

  elements: {
    loading: ".loading",
  },

  sections: {
    nav: {
      selector: 'nav.layout__nav',
      locateStrategy: 'css selector',
      elements: {
        aboutLink: 'a[href="/about/"]',
        gameLink: 'a[href="/game/"]',
      },
    },
    main: {
      selector: '.layout',
      locateStrategy: 'css selector',
    },
    content: {
      selector: 'main.layout__content',
      locateStrategy: 'css selector',
    },
    footer: {
      selector: 'footer.layout__footer',
      locateStrategy: 'css selector',
    },
  }
};
