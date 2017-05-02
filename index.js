var $input = document.querySelector("#input")
var $output = document.querySelector("#output")
var convert = require("./lib/convert")

setInterval(function () {
  $output.value = convert($input.value)
}, 1000)

