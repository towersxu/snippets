# vue的nextTick

首先检查是否支持MutationObserver，如果支持，就用这个。(MutationObserver支持为IE11+)

然后判断是否支持setImmediate，如果支持，则用这个(setImmediate IE10支持)

否则就用setTimeout

```js
if (typeof MutationObserver !== 'undefined' && !(isWechat && isIos)) {
  var counter = 1
  var observer = new MutationObserver(nextTickHandler)
  var textNode = document.createTextNode(counter)
  observer.observe(textNode, {
    characterData: true
  })
  timerFunc = function () {
    counter = (counter + 1) % 2
    textNode.data = counter
  }
} else {
  const context = inBrowser
      ? window
      : typeof global !== 'undefined' ? global : {}
    timerFunc = context.setImmediate || setTimeout
}
return function (cb, ctx) {
    var func = ctx
      ? function () { cb.call(ctx) }
      : cb
    callbacks.push(func)
    if (pending) return
    pending = true
    timerFunc(nextTickHandler, 0)
  }
```
