var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();


// const cors = require('cors');
// const corsOptions = {
//   origin: 'http://localhost:4200',
//   optionsSuccessStatus: 200
// };

//CORS Middleware
app.use(function (req, res, next) {
  //Enabling CORS
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization');
  next();
 });


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
//app.use(express.static(path.join(__dirname, 'public')));


app.use(express.static(path.join(__dirname, 'dist/ng-exp4')));
app.use('/', express.static(path.join(__dirname, 'dist/ng-exp4')));



app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;
