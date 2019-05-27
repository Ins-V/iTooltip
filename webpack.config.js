let path = require('path');

module.exports = {
  entry: './src/iTooltip.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'iTooltip.js',
    publicPath: 'js/'
  },
  devServer: {
    overlay: true
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  }
}
