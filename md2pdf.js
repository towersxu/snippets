var markdownpdf = require("markdown-pdf")
  , fs = require("fs"),
  path = require('path')

fs.createReadStream(path.resolve(__dirname, './notes/ts/如何利用typescript的类型系统.md'))
  .pipe(markdownpdf())
  .pipe(fs.createWriteStream(path.resolve(__dirname, './pdf/typescript的泛型.pdf')))

// --- OR ---

// markdownpdf().from("/path/to/document.md").to("/path/to/document.pdf", function () {
//   console.log("Done")
// })