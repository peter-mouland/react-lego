const chai = require('chai');
const chaiEnzyme = require('chai-enzyme');
const sinonChai = require("sinon-chai");
const { configure } = require('enzyme');
const Adapter = require('enzyme-adapter-react-16');
const jsdom = require("jsdom");
require('babel-core/register')({ only: [/src/, /tests/, /config/] });
require("babel-polyfill");
require('../../src/config/environment')

// take all properties of the window object and also attach it to the mocha global object
function copyProps(src, target) {
  const props = Object.getOwnPropertyNames(src)
    .filter(prop => typeof target[prop] === 'undefined')
    .map(prop => Object.getOwnPropertyDescriptor(src, prop));
  Object.defineProperties(target, props);
}
function setUpDomEnvironment() {
  const { JSDOM } = jsdom;
  const dom = new JSDOM('<!doctype html><html><body></body></html>', {url: 'http://localhost/'});
  const { window } = dom;

  global.window = window;
  global.document = window.document;
  copyProps(window, global);
}
setUpDomEnvironment();

// setup chai
chai.should();
chai.expect();
chai.use(chaiEnzyme());
chai.use(sinonChai);

// setup Enzyme with react
configure({ adapter: new Adapter() })

// Setup react mocks
window.matchMedia = window.matchMedia || function () {
  return {
    matches: false,
    addListener: function () {},
    removeListener: function () {}
  }
}

global.requestAnimationFrame = (callback) => {
  setTimeout(callback, 0)
}
