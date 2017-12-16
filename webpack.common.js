const webpack = require('webpack');
const AssetsPlugin = require('assets-webpack-plugin');

const { SRC, DIST } = require('./src/config/paths');

module.exports = {
  devtool: 'source-map',
  cache: true,
  context: SRC,
  entry: {
    app: [`${SRC}/client-entry.js`],
  },
  output: {
    path: DIST,
    filename: '[name]-[chunkhash].js',
    publicPath: '/'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.PORT': JSON.stringify(process.env.PORT),
      'process.env.DEBUG': JSON.stringify(process.env.DEBUG),
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),
    new AssetsPlugin({ filename: 'compiled/webpack-assets.json' })
  ],
  resolve: {
    modules: ['node_modules', SRC],
    extensions: ['.js', '.jsx', '.scss']
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: [/src/],
        loader: 'babel-loader',
        options: {
          cacheDirectory: true
        }
      }
    ]
  }
};
