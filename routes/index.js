var express = require('express');
var router = express.Router();
var testService = require('../services/test-service');
var contentService = require('../services/get-view-content');


/* GET home page. */
router.get('/api', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


/* GET home page. */
router.get('/api/profile', function(req, res, next) {
  res.send('This is the secure profile area.');
});

//Test Service
router.get('/api/test-service', function(req, res, next) {
  var vTitle = testService.title,
    vDesc = testService.description;
  res.send('results of test-service, title:' + vTitle + ' and desc:' + vDesc);

});

//Get specific CAAS Content by parameter 
router.get('/api/get-view-content', contentService.getList); 

module.exports = router;
