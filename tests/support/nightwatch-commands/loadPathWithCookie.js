exports.command = function loadPathWithCookie(path, cookieValue, name='UMV_TOKEN', callback) {
  const browser = this;
  const cookieOptions = {
    name,
    value: encodeURIComponent(cookieValue)
  };

  const baseUrl = browser.globals.TARGET_PATH;
  const targetUrl = baseUrl + (path ? path : '');

  browser
    .url(baseUrl + '/set-cookie')
    .waitForElementVisible('#app', 10000)
    .deleteCookie(cookieOptions.name)
    .setCookie(cookieOptions, function () {
      console.log('Cookie ' + cookieOptions.name + ' set to ' + cookieValue);
    })
    .url(targetUrl)
    .waitForElementNotPresent('.not-found', 10000)
    .waitForElementVisible('#app', 10000, function () {
      if (typeof callback === 'function') {
        callback.call(browser);
      }
    });
};
