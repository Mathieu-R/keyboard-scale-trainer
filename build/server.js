const http = require('http');
const express = require('express');
const fs = require('fs');
const path = require('path');
const compression = require('compression');
const favicon = require('serve-favicon');
const {createBundleRenderer} = require('vue-server-renderer');
const serverBundleJSON = require('../dist/vue-ssr-server-bundle.json');
const clientManifestJSON = require('../dist/vue-ssr-client-manifest.json');
const template = fs.readFileSync('./src/index.html', 'utf-8');
const app = express();
const production = process.env.NODE_ENV === 'production';
const devServer = require('./dev-server');

const serve = (path, tocache) => express.static(path.resolve(__dirname, path), {
  maxAge: (tocache && production) ? 31536000000 : 0
});

app.use('/sw.js', serve('../dist/sw.js', false));
app.use('/dist', serve('../dist', true));
app.use('/manifest.json', serve('../manifest.json', true));
app.use('/icons', serve('../src/icons', true));
app.use(favicon(path.resolve(__dirname, '../src/icons/icon-72x72.png')));

app.use(compression());

function doSSR(req, res) {
  const ctx = {url : req.url};
  renderer.renderToString(ctx, (err, html) => {
    if (err) {
      throw err;
    }
    res.end(html);
  });
}

function bundleRenderer(bundle, options) {
  return createBundleRenderer(bundle, Object.assign({}, options, {
    runInNewContext: false, // recommended
    template // optional
  }))
}

let renderer;
let ready;
if (production) {
  renderer = bundleRenderer(serverBundleJSON, {
    clientManifest: clientManifestJSON
  });
} else {
  // dev server
  ready = devServer(app, (bundle, options) => {
    renderer = bundleRenderer(bundle, options);
  });
}

app.get('*', production ? doSSR : (req, res) => {
  ready.then(_ => doSSR(req, res));
});

http.createServer(app).listen(8080, _ => {
  console.log('listening on http://localhost:8080');
});
