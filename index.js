let fs = require('fs')
let path = require('path')

let mdPath = []
function getMd (path) {
  if (!fs.statSync(path).isDirectory()) {
    if (/md$/i.test(path)) {
      mdPath.push(path)
    }
    return
  }
  let dirs = fs.readdirSync(path)
  dirs.map((name) => {
    let p = path + '/' + name
    getMd(p)
  })
}

getMd(path.resolve(__dirname, './'))
mdPath.map((p) => {
  let name = ''
  if (/[\u4e00-\u9fa5_a-zA-Z0-9]+\.md/.test(p)) {
    name = RegExp.$1
  }
  name = name + getHashCode(p) + '.md'
  fs.copyFileSync(p, path.resolve(__dirname, '../source/_posts/', name))
})

function getHashCode(str, caseSensitive) {
  if (!caseSensitive) {
    str = str.toLowerCase();
  }
  var hash = 1315423911, i, ch;
  for (i = str.length - 1; i >= 0; i--) {
    ch = str.charCodeAt(i);
    hash ^= ((hash << 5) + ch + (hash >> 2));
  }
  return (hash & 0x7FFFFFFF);
}