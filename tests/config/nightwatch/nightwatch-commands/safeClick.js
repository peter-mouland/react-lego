exports.command = function safeClick(selector, callback) {
  var browser = this;

  browser
    .scrollElementToCenter(selector)
    .click(selector, function(){
      if (typeof callback === 'function') {
        callback.call(browser);
      }
    })
    .pause(600);

  return this;
};
