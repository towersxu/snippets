# setTimeout/setImmediate/process.nextTick的区别

[细说setTimeout/setImmediate/process.nextTick的区别](https://blog.csdn.net/hkh_1012/article/details/53453138)

*setTimeout*和*setImmediate*，两者都代表主线程完成后立即执行，其执行结果是不确定的，可能是setTimeout回调函数执行结果在前，也可能是setImmediate回调函数执行结果在前，但setTimeout回调函数执行结果在前的概率更大些，这是因为他们采用的观察者不同，setTimeout采用的是类似IO观察者，setImmediate采用的是check观察者，而process.nextTick()采用的是idle观察者。

- process.nextTick()，效率最高，消费资源小，但会阻塞CPU的后续调用；
- setTimeout()，精确度不高，可能有延迟执行的情况发生，且因为动用了红黑树，所以消耗资源大；
- setImmediate()，消耗的资源小，也不会造成阻塞，但效率也是最低的.

- process.nextTick可以看做是微任务，在浏览器上，可以使用MutationObserver来实现微任务（vue的nextTick）。
  