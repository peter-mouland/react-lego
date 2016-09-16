const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const cssnano = require('cssnano');
const { SRC, DIST } = require('./paths');

module.exports = {
  devtool: 'source-map',
  output: {
    path: DIST,
    filename: '[name].js',
    publicPath: '/'
  },
  plugins: [
    new ExtractTextPlugin('[name].css'),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        PORT: JSON.stringify(process.env.PORT),
        DEBUG: JSON.stringify(process.env.DEBUG),
        NODE_ENV: JSON.stringify(process.env.NODE_ENV)
      }
    })
  ],
  resolve: {
    modulesDirectories: ['node_modules', SRC],
    extensions: ['', '.js', '.jsx', '.scss']
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        include: [/src/],
        loader: 'babel'
      },
      {
        test: /\.scss$/,
        include: [/src/],
        loader: ExtractTextPlugin.extract('style', [
          'css?sourceMap',
          'postcss',
          'sass?sourceMap&outputStyle=expanded'])
      }
    ]
  },
  postcss: [
    cssnano({
      autoprefixer: {
        browsers: [
          'safari 9',
          'ie 10-11',
          'last 2 Chrome versions',
          'last 2 Firefox versions',
          'edge 13',
          'ios_saf 9.0-9.2',
          'ie_mob 11',
          'Android >= 4'
        ],
        cascade: false,
        add: true,
        remove: true
      },
      safe: true
    })
  ]
};
