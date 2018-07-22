var tape = require("tape");
var kaigyo = require("./lib/kaigyo");
var convert = require("./lib/convert");

tape("改行", function(t) {
  t.plan(4);

  //すでに入っている改行に対しては何もしない
  t.equal(kaigyo("ああ\nあ", 70), "ああ\nあ");

  //全角35文字で改行されること
  let input = "１２３４５６７８９０".repeat(4);
  t.equal(
    kaigyo(input, 70),
    "１２３４５６７８９０１２３４５６７８９０１２３４５６７８９０１２３４５\n６７８９０"
  );

  //全角34文字で改行されること(maxLen = 69の場合)
  let input2 = "１２３４５６７８９０".repeat(4);
  t.equal(
    kaigyo(input2, 69),
    "１２３４５６７８９０１２３４５６７８９０１２３４５６７８９０１２３４\n５６７８９０"
  );

  //単語の切れ目では改行しないこと（34文字）
  input = "山田さん".repeat(10);
  t.equal(
    kaigyo(input, 70),
    "山田さん山田さん山田さん山田さん山田さん山田さん山田さん山田さん山田\nさん山田さん"
  );
});

tape("markdown: 見出し１", function(t) {
  t.plan(1);
  let input = `# タイトル

本文本文
`;

  let expected = `
【タイトル】

本文本文
`;
  t.equals(convert(input), expected);
});

tape("markdown: 見出し２", function(t) {
  t.plan(1);
  let input = `## タイトル

本文本文
`;

  let expected = `
■タイトル

本文本文
`;
  t.equals(convert(input), expected);
});

tape("markdown: 強調（何もしない）", function(t) {
  t.plan(1);
  let input = `ここを*強調*したい`;
  let expected = `ここを強調したい\n`;
  t.equals(convert(input), expected);
});

tape("markdown: リンク（何もしない）", function(t) {
  t.plan(1);
  let input = `詳しくは、[こちら](http://example.com)を参照して下さい`;
  let expected = `詳しくは、こちらを参照して下さい\n`;
  t.equals(convert(input), expected);
});

tape("markdown: リスト内リンク（何もしない）", function(t) {
  t.plan(1);
  let input = `
- 詳しくは、[こちら](http://example.com)を参照して下さい
- こっちは普通のリスト`;
  let expected = `　・詳しくは、こちらを参照して下さい\n　・こっちは普通のリスト\n`;
  t.equals(convert(input), expected);
});

tape("markdown: Image（何もしない）", function(t) {
  t.plan(1);
  let input = `![Alt](test.jpg)`;
  let expected = `\n`;
  t.equals(convert(input), expected);
});

tape("markdown: コードブロック（何もしない）", function(t) {
  t.plan(1);
  let input = "```\nfunction hello(){\n  foo();\n}\n```";
  let expected = `function hello(){\n  foo();\n}\n`;
  t.equals(convert(input), expected);
});

tape("markdown: HTML（何もしない）", function(t) {
  t.plan(1);
  let input = '<script>alert("I am XSS!")</script>';
  let expected = `<script>alert("I am XSS!")</script>\n`;
  t.equals(convert(input), expected);
});
