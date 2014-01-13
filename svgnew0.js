
tmpSvg('ww!!!<?xml version="1.0" ?><!DOCTYPE svg  PUBLIC "-//W3C//DTD SVG 1.1//EN"  "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg enable-background="new 0 0 96 96" height="96px" id="expand" version="1.1" viewBox="0 0 96 96" width="96px" x="0px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" y="0px"><path d="M80,4H68c-2.209,0-4,1.791-4,4s1.791,4,4,4h12c2.21,0,4,1.79,4,4v12c0,2.209,1.791,4,4,4s4-1.791,4-4V16  C92,9.373,86.627,4,80,4z"/><path d="M28,4H16C9.373,4,4,9.373,4,16v12c0,2.209,1.791,4,4,4s4-1.791,4-4V16c0-2.21,1.79-4,4-4h12c2.209,0,4-1.791,4-4  S30.209,4,28,4z"/><path d="M88,64c-2.209,0-4,1.791-4,4v12c0,2.21-1.79,4-4,4H68c-2.209,0-4,1.791-4,4s1.791,4,4,4h12c6.627,0,12-5.373,12-12V68  C92,65.791,90.209,64,88,64z"/><path d="M28,84H16c-2.21,0-4-1.79-4-4V68c0-2.209-1.791-4-4-4s-4,1.791-4,4v12c0,6.627,5.373,12,12,12h12c2.209,0,4-1.791,4-4  S30.209,84,28,84z"/></svg>');

function tmpSvg( svgSource ) {
  console.log(svgSource);
}

//===============================================
// SVG normalization from imported SVG-image

var _       = require('lodash');
var XMLDOMParser = require('xmldom').DOMParser;

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
function normalizeSvg( svgSource ) {
  var result = {};
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

  return result;
}

// Check the influence of the tag on the result of imports, and populating arrays missedTags, missedAttrs
function analizeTag( tag ) {
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
      _.forEach(attrs, function(key) {
        switch (attrs[key].name) {
          case "fill":
          //...
          case "opacity":
            result.ok = false;
            result.missedAttrs.push(attrs[key].name);
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
  var path = "";
  analizeTag(node);
  if (node.tagName == "path") {
    path = node.getAttribute('d');
  } else {
    _.forEach(node, function(child) {
      path += analizeNode( child );
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

