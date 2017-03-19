var glob = require("glob");
var fs = require("fs-extra");

// required to ensure .scss and other assets exists where node server expects them.
[ "src/**/*.json",
  "src/**/*.svg",
  "src/app/**/*.scss"
].forEach(globStr => {
  glob(globStr, {}, function (er, files) {
    files.forEach((file) => {
      fs.copySync(file, file.replace('src/', 'compiled/'))
    });
  });
});
