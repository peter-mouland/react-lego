/* eslint-disable no-console */
const { app, bundler, compiler } = require('./server/server.js');

bundler.listen(8080, 'localhost', () => {
  console.log('Bundling project, please wait...');
});

compiler.plugin('done', () => {
  app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
  });
});
