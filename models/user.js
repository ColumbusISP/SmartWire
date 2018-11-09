// The User model.
'use strict'; 

var Sequelize = require('sequelize');
var bcrypt = require('bcrypt');

var config = require('../config/db-config');
var db = require('../services/database');

// 1: The model schema.
var modelDefinition = {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    username: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
    },

    password: {
        type: Sequelize.STRING,
        allowNull: false
    },   
    role: {
        type: Sequelize.INTEGER,
        defaultValue: config.userRoles.user
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

// 2: The model options.
var modelOptions = {
    instanceMethods: {
        //comparePasswords: comparePasswords
    },
    hooks: {
        beforeValidate: hashPassword
    }
};

// 3: Define the User model.
var UserModel = db.define('user', modelDefinition, modelOptions);

// Hashes the password for a user object.
function hashPassword(user) {
    if(user.changed('password')) {
        return bcrypt.hash(user.password, 10).then(function(password) {
            user.password = password;
        });
    }
}

module.exports = UserModel;