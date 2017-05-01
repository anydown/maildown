var kaigyo = require("./lib/kaigyo")
var parse = require("markdown-to-ast").parse;
var Syntax = require("markdown-to-ast").Syntax;
var traverse = require("txt-ast-traverse").traverse;
var VisitorOption = require("txt-ast-traverse").VisitorOption;

function convert(input) {
  var output = ""
  var AST = parse(input);

  traverse(AST, {
    enter(node) {
      //console.log("enter", node.type);
      if (node.type === Syntax.Paragraph) {
        output += kaigyo(node.children.map(item => item.value).join("")) + "\n"
        output += "\n"
        return VisitorOption.Skip;
      }

      if (node.type === Syntax.HorizontalRule) {
        output += "----------------------------------------"
        output += "\n"
      }

      if (node.type === Syntax.Header) {
        output += "\n"
        if (node.depth === 1) {
          output += "【" + node.children.map(item => item.value).join("") + "】" + "\n"
        }
        if (node.depth === 2) {
          output += "■" + node.children.map(item => item.value).join("") + "" + "\n"
        }
        output += "\n"
        return VisitorOption.Skip;
      }
      if (node.type === Syntax.List) {
        var toText = item => item.value
        if(node.ordered){
          var toItem = (listitem, i) => "　（"+(i+1)+"）"+ listitem.children[0].children.map(toText).join("") + "\n"
          var listtext = node.children.map(toItem).join("")
          output += listtext
        }else{
          var toItem = listitem => "　・"+ listitem.children[0].children.map(toText).join("") + "\n"
          var listtext = node.children.map(toItem).join("")
          output += listtext
        }
        output += "\n"
        return VisitorOption.Skip;
      }
      if (node.type === Syntax.ListItem) {
      }
    },
    leave(node) {
      //console.log("leave", node.type);
    }
  });
  return output
}

var $input = document.querySelector("#input")
var $output = document.querySelector("#output")

setInterval(function(){
  $output.value = convert($input.value)
}, 1000)

