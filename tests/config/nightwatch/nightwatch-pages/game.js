// https://github.com/nightwatchjs/nightwatch/wiki/Page-Object-API
// http://nightwatchjs.org/guide#using-page-objects
import { findRoute } from '../../../../src/app/routes';

module.exports = {

  url: function () {
    return findRoute('game').path;
  },

  elements: [{
    main: "#game"
  }],

  sections: {

    main: {

      selector: '#game',
      locateStrategy: 'css selector'

    }
  }
};
