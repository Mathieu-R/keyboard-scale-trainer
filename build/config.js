const path = require('path');
const production = process.env.NODE_ENV === 'production';

module.exports = {
    entry: {
      front: [path.resolve(__dirname, '../src/entry-client.js')], // entrypoint for front js file
      back: [path.resolve(__dirname, '../src/entry-server.js')] // entrypoint for server js file
    },
    vendor: ['vue'],
    devtool: production ? false : 'eval-cheap-module-source-map',
    componentsPath: path.resolve(__dirname, '../src/components'), // path for components (aliases)
    staticPath: path.resolve(__dirname, '../src'), // path for static files (aliases)
}
