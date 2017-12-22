const glob = require('glob');
const fs = require('fs-extra');

// required to ensure .scss and other assets exists where node server expects them.
[ 'src/**/*.json',
  'src/**/*.svg',
  'src/app/**/*.scss'
].forEach((globStr) => {
  glob(globStr, {}, (er, files) => {
    files.forEach((file) => {
      fs.copySync(file, file.replace('src/', 'compiled/'));
    });
  });
});
