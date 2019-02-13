const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

const config = {
   entry: [
      './src/index.js'
   ],
   output: {
      filename: 'bundle.js',
      path: path.join(__dirname, '/dist')
   },
   plugins: [
      new CleanWebpackPlugin(['dist']),
      new HtmlWebpackPlugin({
         title: 'Test',
         template: './src/index.html'
      }),
      new webpack.HotModuleReplacementPlugin()
   ],
   module: {
      rules: [
         {
            test: /\.js$/,
            loaders: [
               'babel-loader',
            ],
            exclude: /node_modules/
         },
      ],
   },
   devServer: {
      contentBase: './dist',
      hot: true,
      proxy: {
         '/api': {
            target: 'http://localhost:3000',
            pathRewrite: {'^/api' : ''},
            secure: false
         }
      }
   }
};

module.exports = config;
