/*
* The .babel.js in the file name is what makes this work as es6
* */
import webpack from 'webpack';
import autoprefixer from 'autoprefixer';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import './environment';
import { SRC, DIST } from './paths';

export default {
  devtool: 'source-map',
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
          'sass?sourceMap&outputStyle=expanded'].join('!'))
      }
    ]
  },
  postcss: [autoprefixer]
};
