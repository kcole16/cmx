const path = require('path');
const express = require('express');
const app = express();
const port = (process.env.PORT || 3000);

if (process.env.NODE_ENV !== 'production') {
  const webpack = require('webpack')
  const webpackDevMiddleware = require('webpack-dev-middleware')
  const webpackHotMiddleware = require('webpack-hot-middleware')
  var config = require('./webpack.config.dev.js')
  const compiler = webpack(config)

	app.use(require('webpack-dev-middleware')(compiler, {
	  noInfo: true,
	  publicPath: config.output.publicPath
	}));

	app.use(require('webpack-hot-middleware')(compiler));
}
const publicPath = express.static(path.join(__dirname, '/static'))

app.use('/static/', publicPath);
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, (err) => {
  if (err) {
    console.log(err);
    return;
  }

  console.log('Listening at http://localhost:3000');
});
