/*
 * The .babel.js in the file name is what makes this work as es6
 * */
import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import PurifyCssPlugin from 'purifycss-loader/PurifyCssPlugin';
import cssnano from 'cssnano';
import './environment';
import { SRC, DIST } from './paths';

export default {
  entry: {
    app: [
      `${SRC}/client-entry.js`
    ]
  },
  output: {
    path: DIST,
    filename: '[name].js',
    publicPath: '/'
  },
  plugins: [
    new ExtractTextPlugin('[name].css'),
    new PurifyCssPlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({ minimize: true }),
    new webpack.DefinePlugin({
      'process.env': {
        PORT: JSON.stringify(process.env.PORT),
        DEBUG: JSON.stringify(process.env.DEBUG),
        NODE_ENV: JSON.stringify('production')
      }
    })
  ],
  resolve: {
    modulesDirectories: ['node_modules', SRC],
    extensions: ['', '.js', '.jsx', '.scss']
  },
  module: {
    postLoaders: [{
      test: /\.css$/,
      loaders: ['postcss', 'purifycss']
    }],
    loaders: [
      {
        test: /\.jsx?$/,
        include: [/src/],
        loader: 'babel'
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style', [
          'css',
          'sass?outputStyle=compact'].join('!'))
      },
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
