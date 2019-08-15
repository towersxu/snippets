// 表面功能版
var promiseRes = []
function thenFn (fn) {
}

function PromiseInvoke(fn) {
  // 
  setTimeout(() => {
    fn.call(this, thenFn)
  })
  return PromiseInvoke.prototype
}

function thenable (thenFn1) {
  thenFn = thenFn1
  // setTimeout(() => {
  //   thenFn1.apply(this, promiseRes)
  // })
  return PromiseInvoke.prototype
}

function catchable () {
  return PromiseInvoke.prototype
}

PromiseInvoke.then = PromiseInvoke.prototype.then = thenable
PromiseInvoke.catch = PromiseInvoke.prototype.catch =catchable

new PromiseInvoke(function (resolve, reject) {
  setTimeout(function () {
    resolve(111)
  }, 1000)
}).then(function name1 (res) {
  console.log('then2', res)
}).catch(e => {
  console.log(e)
})

// PromiseInvoke.then(function () {
//   console.log(33)
// });
// console.log(11)
