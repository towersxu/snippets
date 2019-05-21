// has方法用来拦截HasProperty操作，即判断对象是否具有某个属性时，这个方法会生效。典型的操作就是in运算符。
// has方法拦截的是HasProperty操作，而不是HasOwnProperty操作，
// 即has方法不判断一个属性是对象自身的属性，还是继承的属性。
// 虽然for...in循环也用到了in运算符，但是has拦截对for...in循环不生效。
var obj = {
  _times: 1,
  age: 1,
  name: 2
}

console.log('_times' in obj)

var proxyObj = new Proxy(obj, {
  has: function (target, prop) {
    if (prop[0] === '_') {
      return false
    } else {
      return !!target[prop]
    }
  }
})

console.log('_times' in proxyObj)