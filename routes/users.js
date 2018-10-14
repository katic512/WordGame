var express = require('express');
var router = express.Router();
var restApiHelper = require('../lib/restApiHelper');
var outJson = require('../constants/out.json');
/* GET users listing. */
router.get('/', function(req, res, next) {
  restApiHelper.writeToFile();
  res.send('respond with a resource');
});




router.get('/outjson', function(req, res, next) {
  for(var i=0;i<outJson.length;i++){
    console.log(outJson[i]);
  }
  res.send('length ::'+outJson.length);
});

module.exports = router;
