exports.command = function safeClick(selector, callback) {
  var browser = this;

  browser
    .waitForElementPresent(selector)
    .scrollElementToCenter(selector)
    .click(selector, function(){
      if (typeof callback === 'function') {
        callback.call(browser);
      }
    })

  return this;
};
