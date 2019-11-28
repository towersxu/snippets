function Promise(exec) {
  var self = this;
  self.status = 'pending';
  self.thenFnList = [];
  function resolve(data) {
    if (self.status === 'pending') {
      self.status = 'fulfilled'
      self.data = data
      // 执行then
      for (let i = 0; i < self.thenFnList.length; i++) {
        self.thenFnList[i](self.data)
      }
    }
  }

  function reject() {}

  exec(resolve, reject);
}
Promise.resolve = function () { }
Promise.reject = function () { }
Promise.all = function () { }

Promise.prototype.then = function (onResolved, onRejected) { 
  var self = this; // promise对象
  if (self.status === 'pending') {
    // self.thenFnList.push(onResolved);
    return new Promise(function (resolve, reject) {
      self.thenFnList.push(function (value) {
        try {
          var x = onResolved(self.data)
          if (x instanceof Promise) {
            x.then(resolve, reject)
          }
        } catch (e) {
          reject(e)
        }
      })
    })
  } else if (self.status === 'fulfilled') {
    // todo: 是否考虑微任务模拟
    onResolved(self.data)
  }
  return 
}
Promise.prototype.catch = function () { }

var p = new Promise(function (resolve) {
  setTimeout(function () {
    resolve(1111)
  }, 3000)
})

p.then(function (r) {
  console.log(r, 1)
  return 2
})
.then(function (r) {
  console.log(r, 2)
})
