//
// testing svg imports
//
// call format:
// node index.js                   - lists all svg-files in the directory "svgfilesin"
// node index.js <number svg-file> - processing file from the list at number "number svg-file"

'use strict';

var fs = require('fs');
var svgconv = require("./svgconvert");

var args = process.argv.slice(2);

var namePrefix = 'result-';
var storagePathIn = 'svgfilesin/';     //source svg-files
var storagePathOut = 'svgfilesout/'; //resulting svg-files

fs.readdir(storagePathIn, function(err, files) {
  if (err) {
    console.log('Cannot read ' + storagePathIn + ' directory.');
    return;
  }

  if (args[0] == undefined) {//
    
    for (var i = 0; i < files.length; i++) {
      console.log(i, files[i]);
    }

  } else if (args[0] < files.length) {
    
    fs.readFile(storagePathIn + files[args[0]], {encoding: 'utf8'}, function (errIn, dataIn) {
      var svgResult = svgconv.normalizeSvg(dataIn);
      console.log(svgResult);
      console.log('Обработка файла:', storagePathIn + files[args[0]] );
      fs.writeFile(storagePathOut + namePrefix + files[args[0]], 
        '<svg version="1.1" viewBox="0 0 '+svgResult.width+' '+svgResult.height+'"><path d="'+svgResult.path+'"/></svg>', 
        function(errOut) {
          if(errOut) {
            console.log(errOut);
          } else {
            console.log("Файл svg сохранен.");
          }
      });

      fs.writeFile(storagePathOut + namePrefix + files[args[0]] + '_res', 
        'path:'+svgResult.path+'\n\ '+
        'x:'+svgResult.x+'\n\ '+
        'y:'+svgResult.y+'\n\ '+
        'width:'+svgResult.width+'\n\ '+
        'height:'+svgResult.height+'\n\ '+
        'ok:'+svgResult.ok+'\n\ '+
        'unknownTags:'+svgResult.unknownTags+'\n\ '+
        'unknownAttrs:'+svgResult.unknownAttrs+'\n\ '+
        'missedTags:'+svgResult.missedTags+'\n\ '+
        'missedAttrs:'+svgResult.missedAttrs+'\n\ ',
        function(errOutRes) {
          if(errOutRes) {
            console.log(errOutRes);
          } else {
            console.log("Файл результов сохранен.");
          }
      });
      
      fs.link(storagePathIn + files[args[0]], storagePathOut + files[args[0]], function(errLnk) {
        if(errLnk) {
          console.log(errLnk);
        } else { //delete source files
//          fs.unlink(storagePathIn + files[args[0]], function(errUnlnk) {
//            if(errUnlnk) {
//              console.log(errUnlnk);
//            } else {
//              console.log("Старый файл перемещен");
//            }
//          });
        }
      });
      
    });
    
  }

});
