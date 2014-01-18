svgconvert.js - модуль преобразования SVG-файла
import_svg_image.js - измененная процедура import_svg_image с использованием нового модуля
index.js - для тестирования модуля svgconvert

Папки:
svgfilesin - исходные svg-файлы
svgfilesout - преобразованные svg-файлы

Тестировать можно в командной строке:
node index.js
 - выдается нумерованный список svg файлов из папки svgfilesin
node index.js <номер из списка>
 - выполняется преобразование файла под указанным в параметре номером,
результат выдается в консоль а также в папке svgfilesout формируется два файла - новый svg-файл и файл со свойствами результирующего объекта

==============

svgconvert.js - SVG-file conversion module 
import_svg_image.js - import_svg_image modified procedure using the new module 
index.js - test module svgconvert 

Folders: 
svgfilesin - source svg-files 
svgfilesout - converted svg-files

You can test in command line: 

node index.js 
  - Issued a numbered list svg files in the folder svgfilesin 

node index.js <number from the list> 
  - Converts a file specified by the parameter number, 
the result is given in the console and in the folder svgfilesout formed two files - new svg-file and the properties of the resulting object