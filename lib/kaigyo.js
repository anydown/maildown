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
 * @param {string} input
 */
function kaigyo(input, maxLen) {
  var tinySegmenter = new TinySegmenter();
  var segs = tinySegmenter.segment(input);

  var result = "";
  var lengthCount = 0;
  segs.forEach(segment => {
    var isKinsoku = "、。．，,.".indexOf(segment) >= 0;
    var segmentSize = charcount(segment);
    if (segment.indexOf("\n") >= 0) {
      lengthCount = 0;
    }
    if (segmentSize + lengthCount > maxLen && !isKinsoku) {
      result += "\n";
      lengthCount = segmentSize;
    }
    result += segment;
    lengthCount += segmentSize;
  });
  return result;
}

module.exports = kaigyo;
