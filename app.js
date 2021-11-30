var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const { createProxyMiddleware } = require('http-proxy-middleware');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var apiRouter = require('./api/routers/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api', apiRouter);

// Config Stream
// proxy middleware options
const options = {
  // target: 'http://localhost:3000', // target host
  target: 'https://dash.akamaized.net', // target host
  changeOrigin: true, // needed for virtual hosted sites
  ws: true, // proxy websockets
  pathRewrite: {
    // '^/api/old-path': '/api/new-path', // rewrite path
    // '^/api/remove/path': '/path', // remove base path
    // https://dash.akamaized.net/akamai/bbb_30fps/bbb_30fps.mpd
    '^/proxy-video': '/akamai', // rewrite path
  }
};

// create the proxy (without context)
const exampleProxy = createProxyMiddleware(options);
app.use('/proxy-video', exampleProxy);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
