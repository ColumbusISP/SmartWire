'use strict';

var JWTStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;

var User = require('../models/user');
var config = require('../config/db-config');

// Hooks the JWT Strategy.

function hookJWTStrategy(passport) {
    var options = {};
    options.secretOrKey = config.keys.secret;
    options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    options.ignoreExpiration = false;
    var user = User; 
    
    passport.use(new JWTStrategy(options, (JWTPayload, done) => {
        user = User.findOne({ where: { username: JWTPayload.username  } });
        if (user!=null) {
            return done(null, true)
        }
        return done(null, false)
    })
    )
    
}

module.exports = hookJWTStrategy;
