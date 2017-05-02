var kaigyo = require("./kaigyo")
var parse = require("markdown-to-ast").parse;
var Syntax = require("markdown-to-ast").Syntax;
var traverse = require("txt-ast-traverse").traverse;
var VisitorOption = require("txt-ast-traverse").VisitorOption;
var WordTable = require("word-table")


function nodeToString(node) {
  var output = ""
  if (node.value) {
    output += node.value
  }
  if (node.children) {
    node.children.forEach((leaf) => {
      output += nodeToString(leaf)
    })
  }
  return output
}

/**
 * convert AST to plaintext
 * @param {*} AST
 */
function convert(input) {
  var output = []
  var AST = parse(input);
  var tempTable = []
  var tempTableRow = []

  traverse(AST, {
    enter(node) {
      //console.log("enter", node.type);
      switch (node.type) {
        case Syntax.Document:
          break;
        case Syntax.Paragraph:
          output.push(kaigyo(nodeToString(node)))
          output.push("")
          return VisitorOption.Skip;
          break;

        case Syntax.BlockQuote:
          output.push(nodeToString(node))
          output.push("")
          break;

        case Syntax.ListItem:
          //ListItem要素ではolかulか判断出来ないので、上位のListで処理を行っている
          //でも、これだと入れ子要素はレンダリングできなそう（いま出来てない）
          break;

        case Syntax.List:
          var toText = item => item.value
          if (node.ordered) {
            var toItem = (listitem, i) => "　（" + (i + 1) + "）" + nodeToString(listitem) + "\n"
            var listtext = node.children.map(toItem).join("")
            output.push(listtext)
          } else {
            var toItem = listitem => "　・" + nodeToString(listitem) + "\n"
            var listtext = node.children.map(toItem).join("")
            output.push(listtext)
          }
          return VisitorOption.Skip;
          break;

        case Syntax.Header:
          output.push("")
          if (node.depth === 1) {
            output.push("【" + node.children.map(item => item.value).join("") + "】")
          }
          if (node.depth >= 2) {
            output.push("■" + node.children.map(item => item.value).join("") + "")
          }
          output.push("")
          return VisitorOption.Skip;

          break;

        case Syntax.CodeBlock:
          output.push(nodeToString(node))
          output.push("")
          break;

        case Syntax.Html:
          output.push(nodeToString(node))
          output.push("")
          break;

        case Syntax.ReferenceDef:
          break;

        case Syntax.HorizontalRule:
          output.push("----------------------------------------")
          break;

        case Syntax.Str:
          break;

        case Syntax.Break:
          break;

        case Syntax.Emphasis:
          break;

        case Syntax.Strong:
          break;

        case Syntax.Html:
          break;

        case Syntax.Link:
          break;

        case Syntax.Image:
          break;

        case Syntax.Code:
          break;

        case "table":
          tempTable = []
          break;
        case "tableCell":
          tempTableRow.push(nodeToString(node))
        default:
          break;
      }
    },
    leave(node) {
      switch (node.type) {
        case "table":
          var wt = new WordTable(tempTable[0],tempTable.slice(1));
          output.push(wt.string())
          output.push("")
          
        case "tableRow":
          tempTable.push(tempTableRow)
          tempTableRow = []
        default:
          break;

      }
    }
  });
  return output.join("\n")
}

module.exports = convert