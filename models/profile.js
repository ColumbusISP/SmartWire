// The User model.
'use strict'; 

var Sequelize = require('sequelize');

var db = require('../services/database');

// 1: The model schema.
var profileModelDefinition = {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    firstname: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
    },
    lastname: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
    }

};

// 3: Define the User model.
var ProfileModel = db.define('user', profileModelDefinition);

module.exports = ProfileModel;