'use strict';

var jwt = require('jsonwebtoken');
var Sequelize = require('sequelize');
var config = require('../../config/db-config');
var db = require('../database');
var User = require('../../models/user');
var bcrypt = require('bcrypt');

// The authentication controller.
var AuthController = {};

// Register a user.
AuthController.signUp = function(req, res) {
    if(!req.body.username || !req.body.password) {
        res.json({ message: 'Please provide a username and a password.' });
    } else {
        db.sync().then(function() {
            var newUser = {
                username: req.body.username,
                password: req.body.password
            };

            return User.create(newUser).then(function() {
                res.status(201).json({ message: 'Account created!' });
            });
        }).catch(function(error) {
            console.log(error);
            res.status(403).json({ message: 'Username already exists!' });
        });
    }
}

// Authenticate a user.
AuthController.authenticateUser = function(req, res, next) {
    if(!req.body.username || !req.body.password) {
        res.status(404).json({ errorcode: 'Auth-01', message: 'Username and password are needed!' });
    } else {
        var username = req.body.username,
            password = req.body.password,
            potentialUser = { where: { username: username } };

        User.findOne(potentialUser).then(function(user, err) {
            if(!user) {
                //next(err);
                res.status(404).json({ errorcode: 'Auth-02', message: 'Authentication failed - No User Found!' });
            } else { 
                if(bcrypt.compareSync(password, user.password)) {
                    var token = jwt.sign(
                        { username: user.username },
                        config.keys.secret,
                        { expiresIn: '30m' }
                    );
                    res.json({
                        success: true,
                        token: 'JWT ' + token,
                        role: user.role
                    });

                } else {
                    res.status(404).json({ errorcode: 'Auth-03', message: 'Login failed!' });                    
                } 
                                
            }
        }).catch(function(error) {
            res.status(500).json({ errorcode: 'Auth-03', message: 'There was an error!' });
        });
    }
}

module.exports = AuthController;