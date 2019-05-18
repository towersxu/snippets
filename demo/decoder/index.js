let fs = require('fs')
const path = require('path')

var filePath = path.join(__dirname, './audios')
let pathes = []
fileDisplay(filePath, './mp3', pathes)
// console.log(pathes)
var process = require('child_process')

trans(pathes)
function trans (p) {
  let cmd = './demo/decoder/decoder ' + p.map(i => {
    return i.replace(/([ | \(|\)])/g, function ($1, $2) {
      return '\\' + $2
    })
  }).join(' ')
  process.exec(cmd, function (err, stdout, stderr) {
    console.log(err)
    console.log(stdout)
    console.log(stderr)
  })
}
/**
 * 文件遍历方法
 * @param filePath 需要遍历的文件路径
 */
function fileDisplay(filePath, dir, path1) {
  //根据文件路径读取文件，返回文件列表
  let files = fs.readdirSync(filePath)
  files.forEach(function (filename) {
    //获取当前文件的绝对路径
    var filedir = path.join(filePath, filename);
    
    //根据文件路径获取文件信息，返回一个fs.Stats对象
    let stats = fs.statSync(filedir)
    var isFile = stats.isFile();//是文件
    var isDir = stats.isDirectory();//是文件夹
    if (isFile) {
      if (/\.qmc3$/.test(filename)) {
        path1.push(filedir);
      }
    } else if (isDir) {
      fileDisplay(filedir, dir + '/' + filename, path1);//递归，如果是文件夹，就继续遍历该文件夹下面的文件
    }
  });
}