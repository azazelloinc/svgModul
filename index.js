'use strict';

//tmpSvg('7997');

function tmpSvg( svgSource ) {
  console.log(svgSource);
}

var svgconv = require("./svgconvert");
var xml01 = '<?xml version="1.0" ?><!DOCTYPE svg  PUBLIC "-//W3C//DTD SVG 1.1//EN"  "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg enable-background="new 0 0 96 96" height="96px" id="expand" version="1.1" viewBox="0 0 96 96" width="96px" x="0px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" y="0px"><path d="M80,4H68c-2.209,0-4,1.791-4,4s1.791,4,4,4h12c2.21,0,4,1.79,4,4v12c0,2.209,1.791,4,4,4s4-1.791,4-4V16  C92,9.373,86.627,4,80,4z"/><path d="M28,4H16C9.373,4,4,9.373,4,16v12c0,2.209,1.791,4,4,4s4-1.791,4-4V16c0-2.21,1.79-4,4-4h12c2.209,0,4-1.791,4-4  S30.209,4,28,4z"/><path d="M88,64c-2.209,0-4,1.791-4,4v12c0,2.21-1.79,4-4,4H68c-2.209,0-4,1.791-4,4s1.791,4,4,4h12c6.627,0,12-5.373,12-12V68  C92,65.791,90.209,64,88,64z"/><path d="M28,84H16c-2.21,0-4-1.79-4-4V68c0-2.209-1.791-4-4-4s-4,1.791-4,4v12c0,6.627,5.373,12,12,12h12c2.209,0,4-1.791,4-4  S30.209,84,28,84z"/></svg>';
svgconv.normalizeSvg(xml01);