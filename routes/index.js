var express = require('express');
var router = express.Router();
var restApiHelper = require('../lib/restApiHelper');
var outJson = require('../constants/out2.json');
var startIndex=0;
/* GET home page. */
router.get('/', function(req, res, next) {

  var now = new Date();
  console.log(now.toISOString());
 // restApiHelper.doSearch();
  res.render('index', { title: 'Express' });

});

router.get('/doSearch', function(req, res, next) {

  var now = new Date();
  console.log(now.toISOString());
  restApiHelper.doSearch();
  res.render('index', { title: 'Express' });

});


router.get('/writeToInput', function(req, res, next) {
  restApiHelper.replaceInputByOuput();
  res.render('index', { title: 'Express' });
});

/* GET setIndex */


router.get('/word/:index?', function(req, res, next) {
  console.log('get word');
  var index = req.params.index||startIndex;
  console.log("index ::"+index);
  var model = formModel(index);
  console.log("word data ="+model.wordObj);
  res.render('words', model);
});


router.delete('/word/:index', function(req, res, next) {
 
  var index = req.params.index;
  console.log("index ::"+index);
  console.log('delete word router handler for index ::'+index);
  outJson[index].delete=true;
  index++;
  var model = formModel(index);
  console.log("word data ="+model.wordObj);
  res.render('words', model);
});

router.post('/word/:index',function(req,res,next){
  console.log('post word');
  var index = req.params.index;
  console.log("index ::"+index);
  console.log("notes::"+req.body.notes);
  outJson[index].notes=req.body.notes;
  outJson[index].wrong=req.body.wrong;
  index++;
  var model = formModel(index);
  console.log("word data ="+model.wordObj);
  res.render('words', model);
});

function formModel(startIndex){
  startIndex=startIndex<0?0:startIndex;
  startIndex=startIndex>=outJson.length?0:startIndex;

  console.log("formModel")
  for(var i=startIndex;i<outJson.length;i++){
      if(outJson[i]){
        startIndex=i;break;
      }
    }
  var model = {
    wordObj:outJson[startIndex],
    index:startIndex,
    count:outJson.length          
    };
    return model;
}


router.get('/writeLatest', function(req, res, next) {
  var tempJson = [];
  var count =0;
  var lastDeleteIndex=0;
  for(var i=0;i<outJson.length;i++){
    if(!outJson[i].delete){
      tempJson.push(outJson[i]);
    }else{
		count++;
		lastDeleteIndex=i;
      console.log('word to be deleted :: '+outJson[i].word);
    }
  }
  lastDeleteIndex = lastDeleteIndex-count;
  startIndex = (lastDeleteIndex<0)?0:lastDeleteIndex;
  outJson=tempJson;
  restApiHelper.writeLatestFile(tempJson);
  res.send('respond with a resource');
});

module.exports = router;
