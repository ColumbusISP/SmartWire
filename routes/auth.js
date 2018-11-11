'use strict';

var router = require('express').Router();

var config = require('../config/db-config');
var AuthController = require('../services/controllers/authController');
var allowOnly = require('../services/routesHelper').allowOnly;
var UserController = require('../services/controllers/userController');
var AdminController = require('../services/controllers/adminController');
var contentService = require('../services/get-view-content');
    
const customers = require('../services/customer/profile/customerprofile');

var APIRoutes = function(passport) {
    let auth = passport.authenticate('jwt', { session: false });

    router.get('/profile', passport.authenticate('jwt', { session: false }), allowOnly(config.accessLevels.user, UserController.index));

    //router.get('/admin', passport.authenticate('jwt', { session: false }), allowOnly(config.accessLevels.admin, AdminController.index));

    router.post('/signup', AuthController.signUp);
    
    router.post('/authenticate', AuthController.authenticateUser);

    router.get('/get-view-content', contentService.getList); 
    
    // Retrieve all Customer
    router.get('/customer', customers.findAll);
   
    // Retrieve a single Customer by Id
    //router.get('/customer/:id', passport.authenticate('jwt', { session: false }), allowOnly(config.accessLevels.user, customers.findById));
    
    router.get('/customer/:id', passport.authenticate('jwt', { session: false }), customers.findById);
    //router.get('/profile', passport.authenticate('jwt', { session: false }), allowOnly(config.accessLevels.user, UserController.index));


    // Update a Customer with Id
    router.put('/customer', customers.update);
    
    return router;
    
};

module.exports = APIRoutes;

