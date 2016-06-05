require('babel-core/register')({
  only: [/src/, /tests/, /config/]
});
require("babel-polyfill");
const jsdom = require('jsdom');
const hook = require('node-hook').hook;
hook('.scss', (source, filename) => 'console.log("' + filename + '");');
// setup the simplest document possible
const doc = jsdom.jsdom(`
<!doctype html>
<html>
  <body>
    <div id="html"></div>
  </body>
</html>`);

// get the window object out of the document and set globals for mocha 
const win = doc.defaultView;
global.document = doc;
global.window = win;

// take all properties of the window object and also attach it to the mocha global object
// from mocha-jsdom https://github.com/rstacruz/mocha-jsdom/blob/master/index.js#L80
propagateToGlobal(win);
function propagateToGlobal(window) {
  for (var key in window) {
    if (!window.hasOwnProperty(key)) continue;
    if (key in global) continue;
    global[key] = window[key];
  }
}

