const config = require('./config.js');
const path = require('path');
const webpack = require('webpack');
const production = process.env.NODE_ENV === 'production';
const htmlWebpackPlugin = require('html-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const MinifyPlugin = require("babel-minify-webpack-plugin");
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const extractSass = new ExtractTextPlugin({
    filename: '[name].[contenthash].css'
});

let plugins;

if (production) {
  plugins = [
    extractSass,
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new MinifyPlugin({}, {
      comments: false
    })
  ];
} else {
  plugins = [
    new webpack.NamedModulesPlugin() // print more readable module names in console on HMR,
  ];
};


const common = {
  devtool: config.devtool,
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: production ? '[name].bundle.[hash].js' : '[name].bundle.js',
    publicPath: '/dist/'
  },
  resolve: {
    extensions: ['.js', '.vue'],
    alias: {
      components: config.componentsPath,
      src: config.staticPath
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          extractCSS: production,
          postcss: [
            autoprefixer({browsers: ['last 3 versions']})
          ],
          optimizeSSR: true
        }
      },{
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  },
  performance: {
    hints: production ? 'warning' : false
  },
  plugins
};

module.exports = common;
