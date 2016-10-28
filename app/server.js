const path = require('path');
const express = require('express');
const webpack = require('webpack');
const config = require('./webpack.config.prod');

const app = express();
const compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/index.html'));
});

app.listen('3000', function() {
  console.log('Node app is running on port', '3000');
});
