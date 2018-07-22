var $input = document.querySelector("#input");
var $output = document.querySelector("#output");
var $warning = document.querySelector("#warning");
var convert = require("../lib/convert");

$input.value = require("./example");

var TextlintKernel = require("@textlint/kernel").TextlintKernel;
var textlint = new TextlintKernel();
var textlintOption = {
  //ブラウザ上でエラーが出るものはコメントアウト（使いたいのもあるけど・・・）
  rules: [
    { ruleId: "textlint-rule-no-todo", rule: require("textlint-rule-no-todo") },
    { ruleId: "max-ten", rule: require("textlint-rule-max-ten") },
    // {ruleId: "no-doubled-conjunctive-particle-ga", rule: require("textlint-rule-no-doubled-conjunctive-particle-ga")},
    {
      ruleId: "no-mix-dearu-desumasu",
      rule: require("textlint-rule-no-mix-dearu-desumasu")
    },
    { ruleId: "no-nfd", rule: require("textlint-rule-no-nfd") },
    // {ruleId: "no-double-negative-ja", rule: require("textlint-rule-no-double-negative-ja")},
    // {ruleId: no-doubled-joshi, rule: require("textlint-rule-no-doubled-joshi")},
    {
      ruleId: "sentence-length",
      rule: require("textlint-rule-sentence-length")
    },
    {
      ruleId: "spellcheck-tech-word",
      rule: require("textlint-rule-spellcheck-tech-word")
    },
    {
      ruleId: "date-weekday-mismatch",
      rule: require("textlint-rule-date-weekday-mismatch")
    },
    // {ruleId: "ja-no-weak-phrase", rule: require("textlint-rule-ja-no-weak-phrase")},
    // {ruleId: "ja-no-redundant-expression", rule: require("textlint-rule-ja-no-redundant-expression")},
    {
      ruleId: "no-mixed-zenkaku-and-hankaku-alphabet",
      rule: require("textlint-rule-no-mixed-zenkaku-and-hankaku-alphabet")
    },
    // {ruleId: "no-dropping-the-ra", rule: require("textlint-rule-no-dropping-the-ra")},
    // {ruleId: "no-doubled-conjunction", rule: require("textlint-rule-no-doubled-conjunction")},
    {
      ruleId: "ja-no-mixed-period",
      rule: require("textlint-rule-ja-no-mixed-period")
    },
    {
      ruleId: "ja-unnatural-alphabet",
      rule: require("textlint-rule-ja-unnatural-alphabet")
    }
  ],
  plugins: [
    { pluginId: "markdown", plugin: require("textlint-plugin-markdown") }
  ],
  ext: ".md"
};

setInterval(function() {
  $output.value = convert($input.value);

  textlint.lintText($input.value, textlintOption).then(result => {
    var html = result.messages
      .map(
        output =>
          `<div class="warning__line">${output.line}: ${output.column} ${
            output.message
          }</div>`
      )
      .join("");
    $warning.innerHTML = html;
    this.outputs = result.messages;
  });
}, 1000);
