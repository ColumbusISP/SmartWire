'use strict';

var jwt = require('jsonwebtoken');
var config = require('../../config/db-config');
var db = require('../database');
var User = require('../../models/user');
var bcrypt = require('bcrypt');
var Boom = require('boom');
// The authentication controller.
var AuthController = {};

// Register a user.
AuthController.signUp = function(req, res) {
    if(!req.body.username || !req.body.password) {
<<<<<<< HEAD
        res.json({ errorcode: 'Reg-01', message: 'Please provide a username and a password.' });
=======
      res.json({ message: 'Please provide a username and a password.' });
      // Successesful messages do not work in boom!
      //res.json(Boom.message('Please provide a username and a password.' ));
>>>>>>> 82301b073acfd3901d51e37bbe48fca6348f3713
    } else {
        db.sync().then(function() {
            var newUser = {
                username: req.body.username,
                password: req.body.password
            };
<<<<<<< HEAD
            return User.create(newUser).then(function() {
                res.status(201).json({ 'success': true, message: 'Account created!' });
            });
        }).catch(function(error) {
            console.log(error);
            res.status(403).json({ errorcode: 'Reg-02', message: 'Username already exists!' });
=======

          return User.create(newUser).then(function () {
            // Successesful messages do not work in boom!
            // res.json(Boom.success('Account created!'));
            res.status(201).json({ message: 'Account created!' });
          });
        }).catch(function(error) {
          console.log(error);
          res.json(Boom.forbidden('Username already exists!'))  ;
            // res.status(403).json({ message: 'Username already exists!' });
>>>>>>> 82301b073acfd3901d51e37bbe48fca6348f3713
        });
    }
}

// Authenticate a user.
AuthController.authenticateUser = function(req, res, next) {
  if (!req.body.username || !req.body.password) {
    res.json(Boom.forbidden('Username and password are needed!')); 
//    res.status(403).json({ errorcode: 'Auth-01', message: 'Username and password are needed!' });
  } else {
        var username = req.body.username,
            password = req.body.password,
            potentialUser = { where: { username: username } };

        User.findOne(potentialUser).then(function(user, err) {
            if(!user) {
                //next(err);
              res.json(Boom.forbidden('Authentication failed - No User Found!')); 
                //res.status(403).json({ errorcode: 'Auth-02', message: 'Authentication failed - No User Found!' });
            } else { 
                if(bcrypt.compareSync(password, user.password)) {
                    var token = jwt.sign(
                        { username: user.username },
                        config.keys.secret,
                        { expiresIn: '1m' }
                    );
                    res.json({
                        success: true,
                        token: 'JWT ' + token,
                        role: user.role
                    });

                } else {
                  res.json(Boom.forbidden('Login failed!')); 
                    //res.status(403).json({ errorcode: 'Auth-03', message: 'Login failed!' });                    
                } 
                                
            }
        }).catch(function (error) {
          res.json(Boom.badRequest('Invalid Request'));
           // res.status(500).json({ errorcode: 'Auth-03', message: 'There was an error!' });
        });
    }
}

module.exports = AuthController;
