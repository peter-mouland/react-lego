const util = require('util');
const events = require('events');
const debug = require('debug');

const log = debug('lego:pageLoaded');
let browser;

function pageLoaded() {
  events.EventEmitter.call(this);
  browser = this.api;
}
util.inherits(pageLoaded, events.EventEmitter);

pageLoaded.prototype.complete = function complete({ e, done }) {
  if (e) {
    log('e', e);
  }
  this.emit('complete');
  if (typeof done === 'function') {
    done();
  }
};

pageLoaded.prototype.command = function pageLoadedFn(page, opts = {}) {
  const { selector, disableAnimations, cookie, done } = opts;
  const url = browser.globals.TARGET_PATH + (page || '');
  log(url);
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
    .waitForElementVisible(selector || 'body', 10000)
    .execute(disableAnimationFunction, args, () => {
      this.complete({ done });
    });

  return this;
};

module.exports = pageLoaded;
