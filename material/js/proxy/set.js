let obj = {
  _times: 0,
  t: 0
}
let proxyObj = new Proxy(obj, {
  get: function (obj, prop) {
    isPrivateAttr(prop)
    return obj[prop]
  },
  set: function (obj, prop, value) {
    // isPrivateAttr(prop)
    obj[prop] = value
    // 严格模式下，set代理如果没有返回true，就会报错
    return true
  }
})

function isPrivateAttr (attr) {
  if (attr.indexOf('_') === 0) {
    throw new Error('can not set private attribute')
  }
}

proxyObj.t = 1
proxyObj._times = 1
// console.log(proxyObj._times)