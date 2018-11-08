'use strict';
var errorSrc = require('../content/eventcodes');

var setResponse = {};

setResponse.setJSON = function (returnstatus, errorcode){
    var retJSON = {
        returnstatus: returnstatus,
        eventcode: errorcode,
        eventmessage: errorSrc[errorcode]
    };
    return retJSON;
}

module.exports = setResponse;
