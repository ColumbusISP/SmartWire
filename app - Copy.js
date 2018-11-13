var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var sequelize = require('sequelize');
var passport = require('passport');
var jwt = require('jsonwebtoken');

//Initialize passport strategy
var hookJWTStrategy = require('./services/passportStrategy');

var app = express();

var indexRouter = require('./routes/index');
var authRouter = require('./routes/auth');
var custRouter = require('./routes/customer/profile');

//CORS Middleware
app.use(function (req, res, next) {
  //Enabling CORS
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization');
  next();
 });

// 4: Parse as urlencoded and json.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// 6: Hook up Passport.
app.use(passport.initialize());
hookJWTStrategy(passport);

//app.use(express.static(path.join(__dirname, 'public')));


app.use(express.static(path.join(__dirname, 'dist/ng-exp4')));
app.use('/', express.static(path.join(__dirname, 'dist/ng-exp4')));


//app.use('/', indexRouter (passport));
app.use('/api', authRouter (passport));
//app.use('/api', custRouter (passport));

module.exports = app;