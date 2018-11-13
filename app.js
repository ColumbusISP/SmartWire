var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var http = require('http');
var finalhandler = require('finalhandler');
var bodyParser = require('body-parser');
var sequelize = require('sequelize');
var passport = require('passport');
var jwt = require('jsonwebtoken');
var fs = require('fs')
var morgan = require('morgan')
var path = require('path')
var cors = require('cors');

//Initialize passport strategy
var hookJWTStrategy = require('./services/passportStrategy');

var app = express();

var authRouter = require('./routes/auth');
 

// create a write stream (in append mode)
var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })

// setup the logger
app.use(morgan('combined', { stream: accessLogStream }));

http.createServer(function (req, res) {
  var done = finalhandler(req, res)
  logger(req, res, function (err) {
    if (err) return done(err)

  })
})
//CORS Middleware

//var cors = require('cors');    
app.use(cors({credentials: true, origin: 'http://localhost:4200'}));


// 4: Parse as urlencoded and json.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// 6: Hook up Passport.
app.use(passport.initialize());
hookJWTStrategy(passport);
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

//app.use(express.static(path.join(__dirname, 'public')));


app.use(express.static(path.join(__dirname, 'dist/ng-exp4')));
app.use('/', express.static(path.join(__dirname, 'dist/ng-exp4')));


//app.use('/', indexRouter (passport));
app.use('/api', authRouter (passport));
//app.use('/api', custRouter (passport));

module.exports = app;
