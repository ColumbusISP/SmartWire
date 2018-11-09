'use strict';

var router = require('express').Router();

var config = require('../../config/db-config');
var AuthController = require('../../services/controllers/authController');
var allowOnly = require('../../services/routesHelper').allowOnly;
//var UserController = require('../services/controllers/userController');
//var AdminController = require('../services/controllers/adminController');

const customers = require('../../services/customer/profile/customerprofile');

var APIRoutes = function(passport) {

    // Retrieve all Customer
    router.get('/customer', customers.findAll);
   
    // Retrieve a single Customer by Id
    router.get('/customer/:id', customers.findById);
 
    // Update a Customer with Id
    router.put('/customer', customers.update);
    
    return router;
    

};

module.exports = APIRoutes;

