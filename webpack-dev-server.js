const merge = require('webpack-merge')
const nodemon = require('nodemon')
const ExtractTextPlugin = require('extract-text-webpack-plugin');

process.env.NODE_ENV = 'development';

require('./src/config/environment');
const baseConfig = require('./webpack.common')
const nodemonConfig = require('./nodemon.json')
const { DIST } = require('./src/config/paths');

module.exports = merge(baseConfig, {
  mode: 'development',
  output: {
    path: DIST,
    filename: '[name].js',
    publicPath: '/'
  },
  plugins: [
    new ExtractTextPlugin('[name].css'),
  ],
  devServer: {
    port: 3000,
    publicPath: baseConfig.output.publicPath,
    stats: { colors: true },
    host: 'localhost',
    historyApiFallback: true,
    watchOptions: {
      aggregateTimeout: 1000
    },
    proxy: {
      '**': 'http://localhost:9000'
    },
    hot: false,
    before() {
      process.env.PORT = 9000;
      nodemonConfig.script = 'src/server-entry.js';
      nodemon(nodemonConfig);
    }
  }
});
