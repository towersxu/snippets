let p = function () {
  return new Promise(function (resolve, reject) {
    setTimeout(function() {
      reject(11);
    }, 1000)
    resolve(22);
  })
}

let res = p();

setTimeout(function () {
  res.then(function (r) {
    console.log(r)
  }).catch(function (e) {
    console.log(e)
  })
}, 3000)