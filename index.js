var kaigyo = require("./lib/kaigyo")
var parse = require("markdown-to-ast").parse;
var Syntax = require("markdown-to-ast").Syntax;
var traverse = require("txt-ast-traverse").traverse;
var VisitorOption = require("txt-ast-traverse").VisitorOption;

var $input = document.querySelector("#input")
var $output = document.querySelector("#output")
var convert = require("./lib/convert")

setInterval(function () {
  $output.value = convert($input.value)
}, 1000)

