'use strict';

var JWTStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;

var User = require('../models/user');
var config = require('../config/db-config');

// Hooks the JWT Strategy.

function hookJWTStrategy(passport) {
    var options = {};
    console.log('A');
    options.secretOrKey = config.keys.secret;
    options.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt");
    options.ignoreExpiration = false;

    passport.use(new JWTStrategy(options, function(JWTPayload, callback) {
        console.log('a');
        User.findOne({ where: { username: JWTPayload.username  } })
            .then(function(user) {
                if(!user) {
                    console.log('b');
                    callback(null, false);
                    return;
                }
                console.log('User: ' + user);
                callback(null, user);
            });
    }));
}

module.exports = hookJWTStrategy;
