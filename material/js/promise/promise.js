// 基础逻辑版

// 1)对象的状态不受外界影响。
// Promise对象代表一个异步操作，有三种状态：
// pending（进行中）、fulfilled（已成功）和rejected（已失败）。
// 只有异步操作的结果，可以决定当前是哪一种状态，任何其他操作都无法改变这个状态。

// 2)一旦状态改变，就不会再变，任何时候都可以得到这个结果。
// Promise对象的状态改变，只有两种可能：从pending变为fulfilled和从pending变为rejected。
// 只要这两种情况发生，状态就凝固了，不会再变了，会一直保持这个结果，这时就称为 resolved（已定型）。
// 如果改变已经发生了，你再对Promise对象添加回调函数，也会立即得到这个结果。
// 这与事件（Event）完全不同，事件的特点是，如果你错过了它，再去监听，是得不到结果的。

// Promise也有一些缺点。首先，无法取消Promise，一旦新建它就会立即执行，无法中途取消。
// 其次，如果不设置回调函数，Promise内部抛出的错误，不会反应到外部。
// 第三，当处于pending状态时，无法得知目前进展到哪一个阶段（刚刚开始还是即将完成）。

var FULFILED = 1;
var PENDDING = -1;
var REJECTED = 0;

function Promise(fn) {
  Promise.status = PENDDING
  fn(resolveFn, rejectFn)
}

function temp () {}

Promise.status = ''

Promise.prototype.then = function (fn) {
  thenable = fn
  return Promise.prototype
}
var thenable = temp

Promise.prototype.catch = function (fn) {
  catchable = fn
  return Promise.prototype
}
var catchable = temp

Promise.resolve = Promise.prototype.resolve = function (fn) {
  thenable = fn
  resolveFn()
}

function resolveFn(res) {
  // 这里应该是一个microTask,暂时用setTimeout 0;
  setTimeout(() => {
    Promise.status = FULFILED
    thenable.call(this, res)
  })
}

function rejectFn(e) {
  setTimeout(() => {
    Promise.status = REJECTED
    catchable.call(this, e)
  })
}

new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(222)
  }, 1000)
}).then(res => {
  console.log(res)
}).catch(e => {
  console.log('e', e)
})

// Promise.resolve(function () {
//   console.log(11)
// })
// console.log(22)