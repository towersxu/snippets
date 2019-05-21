let window = {}
window.double = n => n * 2
window.pow = n => n * n
window.reverseInt = n => n.toString().split('').reverse().join('')

var pipe = (function () {
  return function (val) {
    var funcStack = [];
    var oproxy = new Proxy({}, {
      get: function (pipeObject, fnName, receiver) {
        if (fnName === 'get') {
          return funcStack.reduce(function (val, fn) {
            return fn(val)
          }, val)
        }
        funcStack.push(window[fnName])
        return oproxy
      }
    })
    return oproxy
  }
})()

let res = pipe(3).double.pow.reverseInt.get // (3 * 2)^2 = 36 -> 63
console.log(res)
