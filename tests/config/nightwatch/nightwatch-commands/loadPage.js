/* global document */
const util = require('util');
const events = require('events');

let browser;

function loadPage() {
  events.EventEmitter.call(this);
  browser = this.api;
}
util.inherits(loadPage, events.EventEmitter);

loadPage.prototype.complete = function complete({ e, done }) {
  if (e) {
    console.log('e', e);
  }
  this.emit('complete');
  if (typeof done === 'function') {
    done();
  }
};

loadPage.prototype.command = function pageLoadedFn(page, opts = {}) {
  const { selector = 'body', disableAnimations = true, cookie, done } = opts;
  const url = browser.globals.TARGET_PATH + (page || '');
  console.log(url);
  const args = [disableAnimations ? 'disable-animations' : ''];
  function disableAnimationFunction(className) {
    document.body.className += ` ${className}`;
    return document.body.className;
  }

  browser
    .windowMaximize()
    .url(url)
    .setCookie(cookie)
    .url(url)
    .waitForElementVisible(selector, 2500)
    .execute(disableAnimationFunction, args, () => {
      this.complete({ done });
    });

  return this;
};

module.exports = loadPage;
