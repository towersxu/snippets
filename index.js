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

let dir = path.resolve(__dirname, '../source/_posts')
delDir(dir)

mdPath.map((p) => {
  let name = ''
  if (/(\w+?)\/([\u4e00-\u9fa5_a-zA-Z0-9]+)?\.md/.test(p)) {
    name = `${RegExp.$2}(${RegExp.$1}).md`
    fs.copyFileSync(p, path.resolve(__dirname, '../source/_posts/', name))
  }
})

function delDir(path, deep) {
  let files = [];
  if (fs.existsSync(path)) {
    files = fs.readdirSync(path);
    files.forEach((file, index) => {
      let curPath = path + "/" + file;
      if (fs.statSync(curPath).isDirectory()) {
        delDir(curPath, true); //递归删除文件夹
      } else {
        fs.unlinkSync(curPath); //删除文件
      }
    });
    if (deep) {
      fs.rmdirSync(path);
    }
  }
}
