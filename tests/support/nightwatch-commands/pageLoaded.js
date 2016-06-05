exports.command = function pageLoaded(page, waitFor, callback) {
  var browser = this;
  var url = browser.globals.TARGET_PATH;

  url += (page) ? page : "";

  browser
    .url(url)
    .waitForElementVisible(waitFor || '#html', 10000, function(){
      if (typeof callback === 'function') {
        callback.call(browser);
      }
    });

  return this;
};
