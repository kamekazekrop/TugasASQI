var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var hbs = require('express-handlebars');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var adminRouter = require('./routes/admin');
var kamarRouter = require('./routes/kamar');
var hotelRouter = require('./routes/hotel');

var app = express();

// view engine setup

app.set('view engine', 'hbs');

app.engine('hbs', hbs({
  extname: 'hbs',
  defaultView: 'main',
  layuoutsDir: __dirname + 'views/layouts/',
  partialsDir: __dirname + '/views/partials/'
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/admin', adminRouter);
app.use('/admin/kamar', kamarRouter);
app.use('/admin/hotel', hotelRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;