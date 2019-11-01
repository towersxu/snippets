# Worker

worker传递对象是克隆的一个新的对象。

Worker 接口的 postMessage()方法向worker的内部作用域发送一个消息。这接受单个参数，这是要发送给worker的数据。数据可以是由结构化克隆算法处理的任何值或JavaScript对象，其包括循环引用。

## 结构化克隆算法_The structured clone algorithm

结构化克隆算法是HTML5规范定义的一种用于js克隆复杂对象的算法。用于worker的postmessage的传输数据和indexedDB存储对象。不同于一般的把对象转换为字符串来传递，结构化克隆算法通过维护一个属性依赖的映射，来保证传递的无限循环对象在接收后仍然是无限循环对象。

注意：该算法无法复制Error、Function、DOM,如果尝试这样会抛出DATA_CLONE_ERR异常。对象的原型，属性描述，RegExp的lastIndex等也不能复制。symbols也不支持。

## WindowOrWorkerGlobalScope

WindowOrWorkerGlobalScope mixin 了对 Window 和WorkerGlobalScope 接口的公共特性的描述。

描述也就是说，在浏览器里面并不会存在这样的一个对象。所以也不能创建一个类型为 WindowOrWorkerGlobalScope 的对象。

[MDN地址](https://developer.mozilla.org/zh-CN/docs/Web/API/WindowOrWorkerGlobalScope)

属性：

indexDB

方法：
atob、btoa

setTimeout、setInterval

createImageBitmap: 方法存在 windows 和 workers 中. 它接受各种不同的图像来源, 并返回一个Promise, resolve为ImageBitmap. 可选地参数,图像被剪裁成自（sx，sy）且宽度为sw,高度为sh的像素的矩形。[https://developer.mozilla.org/zh-CN/docs/Web/API/WindowOrWorkerGlobalScope/createImageBitmap](https://developer.mozilla.org/zh-CN/docs/Web/API/WindowOrWorkerGlobalScope/createImageBitmap)

fetch

## WorkerGlobalScope接口

WorkerGlobalScope接口就是WindowOrWorkerGlobalScope在worker中的实际接口，每个 WorkerGlobalScope 都有自己的事件循环.

WorkerGlobakScope有三个子类接口，用来对应不同的worker类型

- DedicatedWorkerGlobalScope
- SharedWorkerGlobalScope
- ServiceWorkerGlobalScope

根据网络worker规范， worker错误事件不应该冒泡

如果你需要从主线程中立刻终止一个运行中的worker，可以调用worker的terminate 方法

```javascript
myWorker.terminate();
```

worker 线程会被立即杀死，不会有任何机会让它完成自己的操作或清理工作。

而在worker线程中，workers 也可以调用自己的 close  方法进行关闭

## SharedWorker

创建一个执行指定url脚本的共享的web进程。

SharedWorker是一种在不同浏览器窗口、iframes、甚至workers中共同访问的worker。它们实现一个不同于普通worker的接口，并具有不同的全局作用域, SharedWorkerGlobalScope。

```js
let sworker = new SharedWorker()
```

> 注意： SharedWorker是新开的进程、worker是在主线程上新开的线程

## ServiceWorker

service workers本质上是Web应用程序和浏览器之间的代理服务器，也可以在网络可用时作为浏览器和网络间的代理。它们旨在（除其他之外）使得能够创建有效的离线体验，拦截网络请求并基于网络是否可用以及更新的资源是否驻留在服务器上来采取适当的动作。他们还允许访问推送通知和后台同步API。

- service worker不能访问DOM
- service worker是异步的，同步API不能使用，如（xmlHttpRequest, localStorage）
- serviec worker只能在https中使用，firefox隐私模式上也不能使用
  
ServiceWorker的使用场景

- 后台数据同步
- 响应来自其它源的资源请求
- 集中接收计算成本高的数据更新，比如地理位置和陀螺仪信息，这样多个页面就可以利用同一组数据
- 在客户端进行CoffeeScript，LESS，CJS/AMD等模块编译和依赖管理（用于开发目的）

ServiceWorker使用步骤：

1）首页在main.js中注册sw.js

```js
// main.js
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw-test/sw.js',
    { scope: '/sw-test/' }
  ).then(function(reg) {
  }).catch(function(error) {
    // registration failed
    console.log('Registration failed with ' + error);
  });
}
```

2）在sw.js中监听安装阶段，声明需要缓存的文件列表

这里是使用的caches来缓存的。不能使用localStorage，因为他是同步的。可以使用indexedDB

```js
// sw.js
self.addEventListener('install', function(event) {
  event.waitUntil(
    // 版本v1,如果内容发生变化，可以更改版本
    caches.open('v1').then(function(cache) {
      return cache.addAll([
        '/sw-test/',
        '/sw-test/index.html',
        '/sw-test/style.css',
        '/sw-test/app.js',
        '/sw-test/image-list.js',
        '/sw-test/star-wars-logo.jpg',
        '/sw-test/gallery/bountyHunters.jpg',
        '/sw-test/gallery/myLittleVader.jpg',
        '/sw-test/gallery/snowTroopers.jpg'
      ]);
    })
  );
});
```

3.监听fetch, 如果请求有返回则返回，如果没有则返回缓存内容

```js
self.addEventListener('fetch', function(event) {
  event.respondWith(caches.match(event.request).then(function(response) {
    // caches.match() always resolves
    // but in case of success response will have value
    if (response !== undefined) {
      return response;
    } else {
      return fetch(event.request).then(function (response) {
        // response may be used only once
        // we need to save clone to put one copy in cache
        // and serve second one
        let responseClone = response.clone();

        caches.open('v1').then(function (cache) {
          cache.put(event.request, responseClone);
        });
        return response;
      }).catch(function () {
        return caches.match('/sw-test/gallery/myLittleVader.jpg');
      });
    }
  }));
});
```

注意这里只是ServiceWorker的示例，PWA并不是这样的。

每次任何被 service worker 控制的资源被请求到时，都会触发 fetch 事件，这些资源包括了指定的 scope 内的文档，和这些文档内引用的其他任何资源（比如 index.html 发起了一个跨域的请求来嵌入一个图片，这个也会通过 service worker 。）

4） 使用activate删除旧版本

每个浏览器都对 service worker 可以用的缓存空间有个硬性的限制。浏览器尽力管理磁盘空间，但它可能会删除整个域的缓存。浏览器通常会删除域下面的所有的数据。

> 注意： ServiceWorker是新开的线程？？

## 多个worker如何相互通信

不通过主进程进行中转，而是在主进程中创建一个MessageChannel，将它作为第二个参数传入worker，然后work用它来通信。

[MessageChannel是什么，怎么使用](https://www.jianshu.com/p/4f07ef18b5d7)
[Worker中的OffscreenCanvas渲染实践与浅析](https://yrq110.me/post/front-end/offscreen-canvas-practice/?hmsr=toutiao.io&utm_medium=toutiao.io&utm_source=toutiao.io)