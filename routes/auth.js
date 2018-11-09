'use strict';

var router = require('express').Router();

var config = require('../config/db-config');
var AuthController = require('../services/controllers/authController');
var allowOnly = require('../services/routesHelper').allowOnly;
var UserController = require('../services/controllers/userController');
var AdminController = require('../services/controllers/adminController');
    

var APIRoutes = function(passport) {
    
    //router.get('/profile', passport.authenticate('jwt', { session: false }), allowOnly(config.accessLevels.user, UserController.index));

    //router.get('/admin', passport.authenticate('jwt', { session: false }), allowOnly(config.accessLevels.admin, AdminController.index));

    router.post('/signup', AuthController.signUp);
    
    router.post('/authenticate', AuthController.authenticateUser);

    return router;

};

module.exports = APIRoutes;

