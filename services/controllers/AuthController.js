'use strict';

var jwt = require('jsonwebtoken');
var config = require('../../config/db-config');
var db = require('../database');
var User = require('../../models/user');
var bcrypt = require('bcrypt');
var returnhelper = require('../returnHelper');

const SUCCESS = 1;
const SUCCESS_INFO = 2;
const ERROR = 4;
const ERROR_INFO = 8;

// The authentication controller.
var AuthController = {};

// Register a user.
AuthController.signUp = function(req, res) {
    if(!req.body.username || !req.body.password) {
        res.status(200).json(returnhelper.setJSON(ERROR_INFO,'Reg01'));
        
    } else {
        db.sync().then(function() {
            var newUser = {
                username: req.body.username,
                password: req.body.password
            };
            return User.create(newUser).then(function() {
                res.status(200).json(returnhelper.setJSON(SUCCESS,'Reg03'));
            });
        }).catch(function(error) {
            console.log(error);
            res.status(200).json(returnhelper.setJSON(ERROR_INFO,'Reg02'));
        });
    }
}

// Authenticate a user.
AuthController.authenticateUser = function(req, res, next) {
    if(!req.body.username || !req.body.password) {
        res.json(returnhelper.setJSON(4,'Auth01'));
    } else {
        var username = req.body.username,
            password = req.body.password,
            potentialUser = { where: { username: username } };

        User.findOne(potentialUser).then(function(user, err) {
            if(!user) {
                res.status(200).json(returnhelper.setJSON(ERROR_INFO,'Auth02'));
            } else { 
                if(bcrypt.compareSync(password, user.password)) {
                    var token = jwt.sign(
                        { username: user.username },
                        config.keys.secret,
                        { expiresIn: '30m' }
                    );
                    var payload = {token: 'JWT ' + token, id: user.id, role: user.role}
                    var returnObj = returnhelper.setJSON(SUCCESS,'Auth05');
                    //append user object payload to response
                    returnObj.payload = payload;
                    res.status(200).json(returnObj);
                } else {
                    
                    res.status(200).json(returnhelper.setJSON(ERROR_INFO,'Auth03')); 
                } 
                                
            }
        }).catch(function(error) {
            console.log(error);
            res.status(500).json(returnhelper.setJSON(ERROR_INFO,'Auth04'));
        });
    }
}

module.exports = AuthController;