// Copyright (C) 2015 Minted Inc.
// All Rights Reserved

'use strict';

var webpack = require('webpack');

// Splitting mender from app.js code using CommonsChunkPlugin
// http://webpack.github.io/docs/code-splitting.html#split-app-and-vendor-code
// http://stackoverflow.com/questions/26603499/simple-solution-to-share-modules-loaded-via-npm-across-multiple-browserify-or-we

module.exports = {
  //enable sourcemaps
  devtool: 'eval-source-map',
  // watch source files (via entry) for changes and rebundle automatically
  watch: true,
  //can specify multiple entry points
  entry: {
    app: './src/index.js',
  },
  output: {
    path: './public',
    filename: 'bundle.js',             // Template based on keys in 'entry' above
    sourceMapFilename: 'bundle.js.map' // Template based on keys in 'entry' above
  },
  resolve: {
    modulesDirectories: [
      // this is where require(..) statements look for modules
      'node_modules'
    ],
    extensions: ['', '.js', '.jsx']  // any are valid extensions
  },
  module: {
    preLoaders: [
      {
        loader: 'source-map-loader'
      }
    ],
    loaders: [
      // allow loading jsx with es6 and js with es6
      {include: /\.jsx?$/, exclude: /node_modules/, loader: 'babel-loader'}
    ]
  },
  plugins: []
};
