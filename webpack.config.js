const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: path.join(__dirname, 'src', 'index.js'),
  mode: 'development',
  output: {
    path: path.resolve(__dirname),
    filename: 'build/bundle.js'
  },
  devServer: {
    static: {
      directory: path.resolve(__dirname, 'build'),
      publicPath: '/'
    },
    port: 8080,
    proxy: { '/api': {
      target: 'http://localhost:3000',
      pathRewrite: {'^/api': ''}
    } }
  },
  module: {
    rules: [
      {
        test: /\.jsx?/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.png$/i,
        type: 'asset/resource'

      }
    ],
  },
  plugins: [new HtmlWebpackPlugin({
    template: path.join(__dirname, './src', 'index.html')
  })],
}
