// Application configuration.
'use strict';

var config = module.exports;

config.db = {
    user: 'SWireDB2', 
    password: 'SWireDB2',
    name: 'ebdb'
};

config.db.details = {
    host: 'aal6mf33os220a.cguyvc4qhvu0.us-east-2.rds.amazonaws.com',
    port: 5432,
    dialect: 'postgres',
    operatorsAliases: false
};

config.keys = {
    secret: '/jVdfUX+u/Kn3qPY4+ahjwQgyV5UhkM5cdh1i2xhozE=' // Not anymore...
};

var userRoles = config.userRoles = {
    guest: 1,    // ...001
    user: 2,     // ...010
    admin: 4     // ...100
};

config.accessLevels = {
    guest: userRoles.guest | userRoles.user | userRoles.admin,    // ...111
    user: userRoles.user | userRoles.admin,                       // ...110
    admin: userRoles.admin                                        // ...100
};
