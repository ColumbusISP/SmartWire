'use strict';

//setup sequelize database objects 

// User Model
var config = require('../config/db-config'),
    Sequelize = require('sequelize');

module.exports = new Sequelize(
    config.db.name,
    config.db.user,
    config.db.password,
    config.db.details
);
