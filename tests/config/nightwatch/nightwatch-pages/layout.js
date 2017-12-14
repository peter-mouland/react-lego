// https://github.com/nightwatchjs/nightwatch/wiki/Page-Object-API
// http://nightwatchjs.org/guide#using-page-objects

module.exports = {

  url: function () {
    return this.api.launchUrl;
  },

  sections: {
    nav: {
      selector: 'nav.layout__nav',
      locateStrategy: 'css selector',
      elements: {
        aboutLink: 'a[href="/about/"]',
        gameLink: 'a[href="/orders/"]',
      },
    },
    main: {
      selector: 'main.layout__content',
      locateStrategy: 'css selector',
    },
    footer: {
      selector: 'footer.layout__footer',
      locateStrategy: 'css selector',
    },
  }
};
