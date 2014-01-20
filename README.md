Developers' Manuals
===================

##Description of modules

- svgconvert.js - SVG-file conversion module
- import_svg_image.js - "import_svg_image" modified procedure using the new module 
- index.js - test module "svgconvert"

##Folders

- svgfilesin - source svg-files 
- svgfilesout - converted svg-files

##Examples of use

####You can test in command line: 
- node index.js - Issued a numbered list svg files in the folder "svgfilesin"
- node index.js <number from the list> - Converts a file specified by the parameter number, 
the result is given in the console and in the folder "svgfilesout" formed two files - new svg-file and the properties of the resulting object
