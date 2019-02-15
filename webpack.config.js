const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');
const dotenv = require('dotenv');
const ServiceWorkerWebpackPlugin = require('serviceworker-webpack-plugin');

const config = () => {

   const env = dotenv.config().parsed;

   const envKeys = Object.keys(env).reduce((prev, next) => {
      prev[`process.env.${next}`] = JSON.stringify(env[next]);
      return prev;
   }, {});

   return {
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
         new webpack.HotModuleReplacementPlugin(),
         new webpack.DefinePlugin(envKeys),
         new ServiceWorkerWebpackPlugin({
            entry: path.join(__dirname, 'src/firebase-messaging-sw.js'),
            filename: 'firebase-messaging-sw.js'
         })
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
   }
};

module.exports = config;
