var tape = require("tape")
var kaigyo = require("./lib/kaigyo")

tape("改行", function(t){
  t.plan(3)

  //すでに入っている改行に対しては何もしない
  t.equal(kaigyo("ああ\nあ"), "ああ\nあ");

  //全角35文字で改行されること
  let input = "１２３４５６７８９０".repeat(4)
  t.equal(kaigyo(input), "１２３４５６７８９０１２３４５６７８９０１２３４５６７８９０１２３４５\n６７８９０");

  //単語の切れ目では改行しないこと（34文字）
  input = "山田さん".repeat(10)
  t.equal(kaigyo(input), "山田さん山田さん山田さん山田さん山田さん山田さん山田さん山田さん山田\nさん山田さん");

})
