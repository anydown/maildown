# これは？

Markdown から日本企業っぽいメールに変換します。

[![dependencies Status](https://david-dm.org/anydown/maildown/status.svg)](https://david-dm.org/anydown/maildown)

[![npm version](https://badge.fury.io/js/%40anydown%2Fmaildown.svg)](https://badge.fury.io/js/%40anydown%2Fmaildown)

# NPM から利用する

`npm install @anydown/maildown`

```
const maildown = require("@anydown/maildown");

const converted = maildown(`## test

# test

- this
- is
- test
`);

console.log(converted);
//>  ■test
//>  【test】
//>  　・this
//>  　・is
//>  　・test
```
