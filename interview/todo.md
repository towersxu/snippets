# 面试准备进度

## 待完成

### 前端基础

#### html

#### css

#### js

- worker 80%
  todo: [webworker动态化，无需JS文件创建worker](https://zhuanlan.zhihu.com/p/83001302)
  todo: [ServiceWorker demo](https://developer.mozilla.org/zh-CN/docs/Web/API/Service_Worker_API)

- Web App Manifest: 40%

- performance 10%

#### es6

#### vue

#### react

- refs: [你想知道的关于 Refs 的知识都在这了](https://juejin.im/post/5db6506d6fb9a0207326a928)

#### nodejs

todo: [分享 10 道 Nodejs 进程相关面试题](https://juejin.im/post/5d082214f265da1bb564f97b)

### 扩展知识

https

http2.0

http缓存

TCP/UDP

linux

### 刷题

[Daily-Interview-Question](https://github.com/Advanced-Frontend/Daily-Interview-Question)

### 算法

算法思想

leetcode

### java

java基础语法

- 多线程

线程安全：在堆内存中的数据由于可以被任何线程访问到，在没有限制的情况下存在被意外修改的风险。

### 数据库

sql

mongo

## 记录

2019年10月28日

- windowOrWorkerGlobalScop、worker、postmessage、结构化克隆算法
- blob如何转换成base64 FileReader、atob/btoa、Uint8Array、“=”填充
- String.fromCharCode(number): 将utf-16编码转换为字符串
- openAL
- OffscreenCanvas(离屏Canvas), 可以在worker中使用

2019年10月29日

- [Web Worker、Service Worker 和 Worklet](https://juejin.im/entry/5c50f22ef265da616b1115a3)
- worker里面可以继续使用new Worker
- DedicatedWorkerGlobalScope
- ServiceWorker、SharedWorker
- 浏览器渲染页面的流程
- 线程与进程
- event loop以及微任务、宏任务； vue nextTick->mutationObserver->2.5+->MessageChannel
- MessageChannel既可以在worker中通信，也可以在iframe来通信。是宏任务，但是比setTimeout(0)
- Worklet 是浏览器渲染流中的钩子，可以让我们有浏览器渲染进程中底层的权限，比如样式和布局。Houdini、CSS TYPE OM
- AudioWorklet
