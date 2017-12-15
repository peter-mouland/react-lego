// https://github.com/nightwatchjs/nightwatch/wiki/Page-Object-API
// http://nightwatchjs.org/guide#using-page-objects
import { findRoute } from '../../../../src/app/routes';
import global from './global'

module.exports = {

  url: function () {
    return findRoute('homepage').path;
  },

  elements: [
    global.elements,
    {
      page: "#homepage",
    }
  ],

  sections: {
    ...global.sections,

    page: {

      selector: '#homepage',
      locateStrategy: 'css selector'

    }
  }
};
