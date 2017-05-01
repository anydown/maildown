var ts = require("./tiny_segmenter")

function charcount(str) {
  len = 0;
  str = escape(str);
  for (i=0;i<str.length;i++,len++) {
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

function kaigyo(input){

  var segmenter = new ts()
  var segs = segmenter.segment(input);
  
  var result = ""
  var lineLength = 0
  segs.forEach((segment)=>{
    isKinsoku = "、。．，,.".indexOf(segment) >= 0
    var segmentSize = charcount(segment)
    if(segment.indexOf("\n") >= 0){
      lineLength = 0
    }
    if(segmentSize + lineLength > 70 && !isKinsoku){
      result += "\n"
      lineLength = segmentSize
    }
    result += segment
    lineLength += segmentSize
  })
  return result
}

module.exports = kaigyo