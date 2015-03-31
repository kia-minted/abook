module.exports = {
  entry: ['./src/index.js'],
  output: {
    filename: 'public/bundle.js'
  },
  devtool: 'eval-source-map',
  module: {
    loaders: [
      {test: /\.jsx?$/, loader: 'babel-loader'}
    ]
  }
};
