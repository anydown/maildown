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
  var counter = 0
  segs.forEach((item)=>{
    var count = charcount(item)
    if(item.indexOf("\n") >= 0){
      counter = 0
    }
    if(count + counter > 70){
      result += "\n"
      counter = count
    }
    result += item
    counter += count
  })
  return result
}

module.exports = kaigyo