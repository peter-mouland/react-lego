// https://github.com/nightwatchjs/nightwatch/wiki/Page-Object-API
// http://nightwatchjs.org/guide#using-page-objects
import { findRoute } from '../../../../src/app/routes';
import global from './global'

module.exports = {

  url: function () {
    return findRoute('game').path;
  },

  getOptionsText: function (browser) {
    return browser.getText
  },

  elements: [
    global.elements,
    {
      page: "#game",
      question: '.question',
      questionOptions: '.question__options',
      dealBtn: '.game__btn--deal'
    }
    ],

  sections: {
    ...global.sections,

    page: {

      selector: '#game',
      locateStrategy: 'css selector'

    }
  }
};
