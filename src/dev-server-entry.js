/* eslint-disable no-console */
const { app, bundler } = require('./server/server.js');

bundler.listen(8080, 'localhost', () => {
  console.log('Bundling project, please wait...');

  app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
  });
});
