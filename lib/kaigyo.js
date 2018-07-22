var TinySegmenter = require("./tiny_segmenter");

/**
 * Get string length, count full width char as 2
 * @param {string} str
 */
function charcount(str) {
  len = 0;
  str = escape(str);
  for (i = 0; i < str.length; i++, len++) {
    if (str.charAt(i) == "%") {
      if (str.charAt(++i) == "u") {
        i += 3;
        len++;
      }
      i++;
    }
  }
  return len;
}

/**
 * Split a string when line length > length
 * @param {string} input Input string
 * @param {number} maxLen Max characters in a line
 * @param {string} indentStr use this string for indent
 */
function kaigyo(input, maxLen, indentStr) {
  var tinySegmenter = new TinySegmenter();
  var segs = tinySegmenter.segment(input);

  var result = "";
  var lengthCount = 0;
  var lineNo = 0;
  segs.forEach(segment => {
    var isKinsoku = "、。．，,.".indexOf(segment) >= 0;
    var segmentSize = charcount(segment);

    if (segment.indexOf("\n") >= 0) {
      lengthCount = 0;
    }

    //現在のセグメントを足すとmaxLen超過しそうな場合
    if (segmentSize + lengthCount > maxLen && !isKinsoku) {
      //改行を付加し、次の行に書く
      result += "\n";
      lengthCount = segmentSize;
      lineNo++;

      //２行目からはインデント文字列を行頭に付加
      if (indentStr && lineNo > 0) {
        result += indentStr;
        lengthCount += charcount(indentStr);
      }
    }
    result += segment;
    lengthCount += segmentSize;
  });
  return result;
}

module.exports = kaigyo;
