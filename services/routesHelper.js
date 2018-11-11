'use strict';

exports.allowOnly = function(accessLevel, callback) {
    console.log('access level: ' + accessLevel);
    

    function checkUserRole(req, res) {
        
        console.log('role: ' + req.user);
        
        
        if(!(accessLevel & req.user.role)) {
            res.sendStatus(403);
            return;
        }

        callback(req, res);
    }

    return checkUserRole;
};
