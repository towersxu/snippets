// apply方法拦截函数的调用、call和apply操作。

function double (val) {
  return val * 2
}

var proxyDouble = new Proxy(double, {
  apply: function (target, ctx, args) {
    return target.apply(ctx, args) * 2
  }
})

console.log(proxyDouble(4))