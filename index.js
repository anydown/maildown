var $input = document.querySelector("#input")
var $output = document.querySelector("#output")
var $warning = document.querySelector("#warning")
var convert = require("./lib/convert")

$input.value = require("./example")

var textlint = require("textlint").textlint;
//ブラウザ上でエラーが出るものはコメントアウト（使いたいのもあるけど・・・）
textlint.setupRules({
  "no-todo": require("textlint-rule-no-todo"),
  "max-ten": require("textlint-rule-max-ten"),
//    "no-doubled-conjunctive-particle-ga": require("textlint-rule-no-doubled-conjunctive-particle-ga"),
  "no-mix-dearu-desumasu": require("textlint-rule-no-mix-dearu-desumasu"),
  "no-nfd": require("textlint-rule-no-nfd"),
//    "no-double-negative-ja": require("textlint-rule-no-double-negative-ja"),
//    "no-doubled-joshi": require("textlint-rule-no-doubled-joshi"),
  "sentence-length": require("textlint-rule-sentence-length"),
  "spellcheck-tech-word": require("textlint-rule-spellcheck-tech-word"),
  "date-weekday-mismatch": require("textlint-rule-date-weekday-mismatch"),
//    "ja-no-weak-phrase": require("textlint-rule-ja-no-weak-phrase"),
//    "ja-no-redundant-expression": require("textlint-rule-ja-no-redundant-expression"),
  "no-mixed-zenkaku-and-hankaku-alphabet": require("textlint-rule-no-mixed-zenkaku-and-hankaku-alphabet"),
//    "no-dropping-the-ra": require("textlint-rule-no-dropping-the-ra"),
//    "no-doubled-conjunction": require("textlint-rule-no-doubled-conjunction"),
  "ja-no-mixed-period": require("textlint-rule-ja-no-mixed-period"),
  "ja-unnatural-alphabet": require("textlint-rule-ja-unnatural-alphabet"),
});

setInterval(function () {
  $output.value = convert($input.value)

  textlint.lintMarkdown($input.value).then((result) => {
    var html = result.messages.map(output=>`<div class="warning__line">${output.line}: ${output.column} ${output.message}</div>`).join("")
    $warning.innerHTML = html
    this.outputs = result.messages;
  })
}, 1000)

