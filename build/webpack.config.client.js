const webpack = require('webpack');
const config = require('./config.js');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.config.js');
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin');
const production = process.env.NODE_ENV === 'production';

const client = merge(baseConfig, {
  devtool: config.devtool,
  entry: {
    app: config.entry.front,
    vendor: config.vendor
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common'
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest'
    }),
    new VueSSRClientPlugin(),
  ]
});

if (production) {
  client.plugins.push(
      new SWPrecacheWebpackPlugin({
      cacheId: 'keyboard-scale-trainer',
      dontCacheBustUrlsMatching: /\.\w{8}\./,
      filename: 'sw.js',
      minify: true,
      staticFileGlobsIgnorePatterns: [/\.map$/],
    })
  );
}

module.exports = client;
