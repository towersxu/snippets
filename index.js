let fs = require('fs')
let path = require('path')
const crypto = require('crypto');


let mdPath = []
function getMd (path) {
  if (path.indexOf('node_module') !== -1) {
    return
  }
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

// let dir = path.resolve(__dirname, '../source/_posts')
// delDir(dir)

mdPath.map((p) => {
  let name = ''
  if (/(\w*?)\/(\w+?)\/([\u4e00-\u9fa5_a-zA-Z0-9]+)?\.md/.test(p)) {
    name = `${RegExp.$3}.md`
    let p1 = RegExp.$1
    let p2 = RegExp.$2
    let pa = path.resolve(__dirname, `../source/_posts/${p1}/${p2}`)
    dirCreate(pa, function () {
      let dirfile = path.resolve(pa, name)
      // 判断目的file是否存在，如果存在
      if (fs.existsSync(dirfile)) {
        Promise.all([getFileHash(dirfile), getFileHash(p)])
        .then(([hash, hash1]) => {
          if (hash !== hash1) {
            fs.copyFileSync(p, dirfile)
          }
        })
        .catch(e => {
          console.log(e)
        })
      } else {
        fs.copyFileSync(p, dirfile)
      }
    })
  }
})

function getFileHash(path) {
  return new Promise((resolve, reject) => {
    const stream = fs.createReadStream(path);
    const fsHash = crypto.createHash('sha256');

    stream.on('data', function (d) {
      fsHash.update(d);
    });

    stream.on('end', function () {
      const md5 = fsHash.digest('hex');
      resolve(md5);
    });
  })
}

/**
 * 判断路径是否存在，如果不存在则不显示
 * @param {string} p 路径
 */
function dirCreate(p, cb) {
  let parent = path.dirname(p)
  if (fs.existsSync(parent)) { // 如果父级存在，则直接创建
    if (!fs.existsSync(p)) { // 如果当前文件目录已经存在
      fs.mkdirSync(p) // 如果不存在，这创建次目录
    }
    cb()
  } else { // 不存在则先创建父级
    dirCreate(parent, function () {
      fs.mkdirSync(p) // 如果不存在，这创建次目录
      cb()
    })
  }
}

// function delDir(path, deep) {
//   let files = [];
//   if (fs.existsSync(path)) {
//     files = fs.readdirSync(path);
//     files.forEach((file, index) => {
//       let curPath = path + "/" + file;
//       if (fs.statSync(curPath).isDirectory()) {
//         delDir(curPath, true); //递归删除文件夹
//       } else {
//         fs.unlinkSync(curPath); //删除文件
//       }
//     });
//     if (deep) {
//       fs.rmdirSync(path);
//     }
//   }
// }