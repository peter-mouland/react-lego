// https://github.com/nightwatchjs/nightwatch/wiki/Page-Object-API
// http://nightwatchjs.org/guide#using-page-objects
import { findRoute } from '../../../src/app/routes';

module.exports = {

  url: function () {
    return findRoute('homepage').path;
  },

  elements: [{
    main: "#homepage"
  }],

  sections: {

    main: {

      selector: '#homepage',
      locateStrategy: 'css selector'

    }
  }
};
