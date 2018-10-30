'use strict';
var contentSrc = require('../content/content-en');

var getContent = {};

getContent.getList = function(req, res) {
   var myData = [];
   if(!req.query){
     myData.push({id:'error', name: 'no params on request'});
     } else {
         for (const param in req.query) {
         var obj = { 
             id: [param],
             name: contentSrc[param],
         };
     myData.push(obj);
     }
     res.json(myData);
    }

}

module.exports = getContent;
