'use strict';

//var server = require("./server");
//server.start();

//tmpSvg('7997');
//console.log(process.argv);

var fs = require('fs');
var svgconv = require("./svgconvert");

var args = process.argv.slice(2);
console.log('args: ', args);

function tmpSvg( svgSource ) {
  console.log(svgSource);
}

var namePrefix = 'result-';
var storagePath = 'svgfiles/';
var path = storagePath + args[0];
console.log('path: ', path);


  fs.readdir(storagePath, function(err, files) {
    if (err) {
      console.log('Cannot read ' + storagePath + ' directory.');
      return;
    }
    
    if (args[0] == undefined) {
      for (var i = 0; i < files.length; i++) {
        console.log(i, files[i]);
      }
        
    } else if (args[0] < files.length) {
      fs.readFile(storagePath + files[args[0]], {encoding: 'utf8'}, function (errIn, dataIn) {
        var svgResult = svgconv.normalizeSvg(dataIn);
        console.log('Res-file:', storagePath + namePrefix + files[args[0]] );
        fs.writeFile(storagePath + namePrefix + files[args[0]], 
          '<svg version="1.1" viewBox="0 0 '+svgResult.width+' '+svgResult.height+'"><path d="'+svgResult.path+'"/></svg>', 
          function(errOut) {
            if(errOut) {
              console.log(errOut);
            } else {
              console.log("Файл svg сохранен.");
            }
        });
        
        fs.writeFile(storagePath + namePrefix + files[args[0]] + '_res', 
          'path:'+svgResult.path+'\n\ '+
          'x:'+svgResult.x+'\n\ '+
          'y:'+svgResult.y+'\n\ '+
          'width:'+svgResult.width+'\n\ '+
          'height:'+svgResult.height+'\n\ '+
          'ok:'+svgResult.ok+'\n\ '+
          'missedTags:'+svgResult.missedTags+'\n\ '+
          'missedAttrs:'+svgResult.missedAttrs+'\n\ ',
          function(errOutRes) {
            if(errOutRes) {
              console.log(errOutRes);
            } else {
              console.log("Файл результов сохранен.");
            }
        });
        
      });
    }
    
  });
