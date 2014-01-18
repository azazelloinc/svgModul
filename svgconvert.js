'use strict';

// SVG normalization from imported SVG-image

var _       = require('lodash');
var XMLDOMParser = require('xmldom').DOMParser;

var result = {};
result.missedTags = [];
result.missedAttrs = [];
result.unknownTags = [];
result.unknownAttrs = [];

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
  
  result.path = getCompoundPath(svgTag);

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

// recursive function to build the resulting path
//
// node: {...} // current dom-node
// path: ""
function getCompoundPath( node ) {
  var path = "";
  if (node.tagName == undefined) return path;
  
  // Check the influence of the tag on the result of imports, and populating arrays missedTags, missedAttrs
  switch (node.tagName) {
    case "rect":
    case "line":
    case "ellipse":
    case "marker":
    case "polygon":
    case "defs":
    case "clipPath":
    case "circle":
    case "style":
    case "linearGradient":
    case "radialGradient":
      result.ok = false;
      if (!_.contains(result.missedTags, node.tagName))
        result.missedTags.push(node.tagName);
      break;
    case "svg":
    case "title":
    case "description":
      //not affect the result
      break;
    case "path":
    case "g":
      result.ok = false;
      var attrs = node.attributes;
      _.forEach(attrs, function(attr) {
        switch (attr.name) {
          case "fill":
          case "stroke":
          case "stroke-miterlimit":
          case "stroke-width":
          case "stroke-linecap":
          case "stroke-linejoin":
          case "style":
          case "fill-rule":
          case "clip-path":
          case "opacity":
            result.ok = false;
            if (!_.contains(result.missedAttrs, attr.name))
              result.missedAttrs.push(attr.name);
            break;
          case "id":
            //not affect the result
          case "d":
          case "transform":
            //consider this case
            break;
          default:
            if (!_.contains(result.unknownAttrs, attr.name))
              result.unknownAttrs.push(attr.name);
            break;
        }
      });
      break;
    default:
      if (!_.contains(result.unknownTags, node.tagName))
        result.unknownTags.push(node.tagName);
      break;
  }
  
  if (node.tagName == "path") {
    path = node.getAttribute('d');
  } else {
    _.forEach(node.childNodes, function(child) {
      path += getCompoundPath( child );
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

