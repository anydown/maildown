# これは？

Markdown から日本企業っぽいメールに変換します。

[![dependencies Status](https://david-dm.org/anydown/maildown/status.svg)](https://david-dm.org/anydown/maildown)

[![npm version](https://badge.fury.io/js/%40anydown%2Fmaildown.svg)](https://badge.fury.io/js/%40anydown%2Fmaildown)

# NPM から利用する

`npm install @anydown/maildown`

```js
const maildown = require("@anydown/maildown");

const converted = maildown(`## test

# test

- this
- is
- test
`, {lineLength: 70});

console.log(converted);
//>  ■test
//>  【test】
//>  　・this
//>  　・is
//>  　・test
```

# Options

| オプション名 | 説明             | デフォルト |
| ------------ | ---------------- | ---------- |
| lineLength   | １行の最大文字長 | 70         |

# Who uses maildown

 - [Markdown to Plain](https://chrome.google.com/webstore/detail/markdown-to-plain/kcfemfieficedfhplhkmlpeddpkgiaok) : Chrome拡張 by [@mtgto](https://github.com/mtgto)
 - [md2mail](https://marketplace.visualstudio.com/items?itemName=satopirka.md2mail) : VSCode拡張 by [@satopirka](https://github.com/satopirka)
