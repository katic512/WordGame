'use strict'
var Client = require('node-rest-client').Client;
var client = new Client();
var util = require('util');
var words = require('../constants/input2.json').words;
var outputFile = './constants/out2.json';
var inputFile = './constants/input2.json';
var fs = require('fs');
var outWords = [];
var fileWritter;

var sampleGet = function sampleGet(callback,word){
    var url="https://owlbot.info/api/v2/dictionary/"+word+"?format=api";
    console.log('url :: '+url);
    client.get('https://owlbot.info/api/v2/dictionary/'+word,function(data,response){
        if(data){
            var wordObj = {
                "word":word,
                "meaning":data
            };
            callback(undefined,wordObj);
        }else{
            callback('no data present');
        }
    });
};

var doSearch = function doSearch(){
     fileWritter = fs.createWriteStream(outputFile,{'flags':'a'});
    for(var i=0;i<words.length;i++){
        let k = i;
        if(k==words.length-1){
            setTimeout(function(){
                sampleGet(function(err,wordObj){
                    if(!err){
                        console.log(util.inspect(wordObj,{showHidden: false, depth: null}));
                        //fileWritter.write(JSON.stringify(wordObj)+",");
                        outWords.push(wordObj);
                        writeToFile();
                    }
                   
                },words[k]);
            },150*k);
        }else{
            setTimeout(function(){
                sampleGet(function(err,wordObj){
                    if(!err){
                        console.log(util.inspect(wordObj,{showHidden: false, depth: null}));
                        //fileWritter.write(JSON.stringify(wordObj)+",");
                        outWords.push(wordObj);
                    }
                   
                },words[k]);
            },150*k);
        }
        
    }
   
};

var writeToFile = function writeToFile(){
    console.log(util.inspect(outWords,{showHidden: false, depth: null}));
    fs.writeFile(outputFile,JSON.stringify(outWords),function(err){
        if(err){
            console.log("error occured :: "+err);
            return;
        }
        console.log("no error while writing file");
        var now = new Date();
  console.log(now.toISOString());
    });
};

var writeLatestFile = function writeLatestFile(outJson){
   // console.log(util.inspect(outJson,{showHidden: false, depth: null}));
    fs.writeFile(outputFile,JSON.stringify(outJson),function(err){
        if(err){
            console.log("error occured :: "+err);
            return;
        }
        console.log("no error while writing file");
        var now = new Date();
  console.log(now.toISOString());
    });
};

var replaceInputByOuput = function replaceInputByOuput(){
    var outPutWords= JSON.parse(fs.readFileSync(outputFile));
    var inputData = {};
    inputData.words = [];
    for(var i=0;i<outPutWords.length;i++){
        inputData.words.push(outPutWords[i].word);   
    }
    console.log(inputData);
    fs.writeFileSync(inputFile,JSON.stringify(inputData));
};

var endFileWriter = function endFileWriter(){
    fileWritter.end();
};

module.exports = {
    writeToFile: writeToFile,
    doSearch: doSearch,
    sampleGet:sampleGet,
    endFileWriter:endFileWriter,
    writeLatestFile:writeLatestFile,
    replaceInputByOuput : replaceInputByOuput
  }