'use strict';

// SVG normalization from imported SVG-image

var _       = require('lodash');
var XMLDOMParser = require('xmldom').DOMParser;

var result = {};

//  Entry Point - pass the original SVG, get "normalized"
//
//  svgSource: ""
//
//  result:
//  path: "",
//    x: ...,
//    y: ...,
//    width: ...,
//    height: ...,
//    ok: ..., // false - error
//    missedTags: [...],
//    missedAttrs: [...] //missed attributes
exports.normalizeSvg = function ( svgSource ) {
  result.ok = true;
  var xmlDoc = (new XMLDOMParser()).parseFromString(svgSource, 'application/xml');

  var svgTag = xmlDoc.getElementsByTagName('svg')[0];
  
  result.path = getCompaundPath(svgTag);

  // getting viewBox values array
  var viewBox = _.map(
    (svgTag.getAttribute('viewBox') || '').split(' '),
    function(val) { return parseInt(val, 10); }
  );

  // getting base parameters
  var attr = {};
  _.forEach(['x', 'y', 'width', 'height'], function(key) {
    attr[key] = parseInt(svgTag.getAttribute(key), 10);
  });

  result.x      = viewBox[0] || attr.x || 0;
  result.y      = viewBox[1] || attr.y || 0;
  result.width  = viewBox[2] || attr.width;
  result.height = viewBox[3] || attr.height;
  console.log(result);

  return result;
}

// Check the influence of the tag on the result of imports, and populating arrays missedTags, missedAttrs
function analizeTag( tag ) {
//  console.log(tag.tagName);
  switch (tag.tagName) {
    case "rect":
    //...
    case "circle":
      result.ok = false;
      result.missedTags.push(tag.tagName);
      break;
    case "path":
      result.ok = false;
      var attrs = tag.attributes;
      _.forEach(attrs, function(attr) {
//        console.log(attr.name);
        switch (attr.name) {
          case "fill":
          //...
          case "opacity":
            result.ok = false;
            result.missedAttrs.push(attr.name);
            break;
        }
      });
      break;
  }
}

// recursive function to build the resulting path
//
// node: {...} // current dom-node
// path: ""
function getCompaundPath( node ) {
  //console.log("<node.tagName:"+node.tagName+">");
  var path = "";
  analizeTag(node);
  if (node.tagName == "path") {
    path = node.getAttribute('d');
  } else {
    _.forEach(node.childNodes, function(child) {
      //console.log(child.tagName);
      path += getCompaundPath( child );
    });  	
  }

  var transform = node.getAttribute('transform');
  path = pathTransform( path, transform );
  
  return path;
}

// Function recalculation path given transform
//
// path: ""
// transform: ""
function pathTransform( path, transform ) {
  //...
  return path;
}
