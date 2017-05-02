/**
 * convert AST to plaintext
 * @param {*} AST
 */
function convert(input) {
  var output = []
  var AST = parse(input);

  traverse(AST, {
    enter(node) {
      //console.log("enter", node.type);
      switch (node.type) {
        case Syntax.Document:
          break;
        case Syntax.Paragraph:
          output.push(kaigyo(node.children.map(item => item.value).join("")))
          output.push("")
          return VisitorOption.Skip;
          break;

        case Syntax.BlockQuote:
          break;

        case Syntax.ListItem:
          break;

        case Syntax.List:
          var toText = item => item.value
          if (node.ordered) {
            var toItem = (listitem, i) => "　（" + (i + 1) + "）" + listitem.children[0].children.map(toText).join("") + "\n"
            var listtext = node.children.map(toItem).join("")
            output.push(listtext)
          } else {
            var toItem = listitem => "　・" + listitem.children[0].children.map(toText).join("") + "\n"
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
          break;

        case Syntax.Html:
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

        default:
          break;
      }
    },
    leave(node) {
      //console.log("leave", node.type);
    }
  });
  return output.join("\n")
}

module.exports = convert