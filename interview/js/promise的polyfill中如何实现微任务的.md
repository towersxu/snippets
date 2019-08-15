# promise的polyfill中如果实现微任务的

参考了core-js中promise的源码，发现微任务是在task.js中实现的。

首先IE10+和nodejs0.10+有setImmediate

如果遇到没有setImmediate的环境

1.Node.js 0.8-

`process.nextTick(runner(id))`

2.Browsers with MessageChannel, includes WebWorkers。采用MessageChannel

```js
  channel = new MessageChannel();
  port = channel.port2;
  channel.port1.onmessage = listener;
  defer = bind(port.postMessage, port, 1);
```

3.IE8虽然有采用的postMessage但是没有webworker,所以采用的

```js
  global.postMessage(id + '', location.protocol + '//' + location.host);
  global.addEventListener('message', listener, false);
```

4.IE8-采用添加js，判断其状态为ONREADYSTATECHANGE

```js
defer = function (id) {
  html.appendChild(createElement('script'))[ONREADYSTATECHANGE] = function () {
    html.removeChild(this);
    run(id);
  };
};
```

5.最后都不行，采用setTimeout 0;
