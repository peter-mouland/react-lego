exports.command = function scrollElementToCenter(selector, callback) {
  var browser = this;
  browser.windowHandle(function(windowHandle) {
    browser.windowSize(windowHandle.value, function(windowSize) {
      var halfHeight = windowSize.value.height / 2;
      browser.element('css selector', selector, function(element) {
        browser.elementIdSize(element.value.ELEMENT, function(elementIdSize) {
          var haldElementSize = elementIdSize.value.height / 2;
          browser.elementIdLocation(element.value.ELEMENT, function(result) {
            var yOffset = result.value.y;
            var execString = 'window.scrollTo(0, ' + (yOffset - (halfHeight - haldElementSize)) + ');';
            browser.execute(execString, function() {
              if (typeof callback === 'function') {
                callback.call(browser);
              }
            });
          });
        });
      });
    });
  });

  return this;
};
