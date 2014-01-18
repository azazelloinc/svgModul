var svgconv = require("./svgconvert");

////
// Import svg image from svg files.
//
// data - text content
//
function import_svg_image(data, file) {
  var svgResult = svgconv.normalizeSvg(data);
  
  var customIcons = N.app.fontsList.getFont('custom_icons');
  
  // Allocate reference code, used to show generated font on fontello page
  // That's for internal needs, don't confuse with glyph (model) code
  var maxRef = _.max(customIcons.glyphs(), function(glyph) {
    return utils.fixedCharCodeAt(glyph.charRef);
  }).charRef;

  var allocatedRefCode = (!maxRef) ? 0xe800 : utils.fixedCharCodeAt(maxRef) + 1;

  if (!svgResult.ok) {
    //... assembly error message
    N.wire.emit('notify', t('error.bad_svg_image', { name: file.name }));
  }
  
  // Scale to standard grid
  var scale  = 1000 / svgResult.height;
  var d = new SvgPath(svgResult.path)
            .translate(-svgResult.x, -svgResult.y)
            .scale(scale)
            .abs()
            .round(1)
            .toString();
  var width = Math.round(svgResult.width * scale); // new width

  var glyphName = basename(file.name.toLowerCase(), '.svg').replace(/\s/g, '-');

  customIcons.addGlyph({
    css:      glyphName,
    code:     allocatedRefCode,
    charRef:  allocatedRefCode++,
    search:   [glyphName],
    svg: {
      path:   d,
      width:  width
    }
  });
}
