# Promise面试点

面试被问了promise，发现自己出了工作中用到的，好多细节点不了，今天细读一下阮一峰的Promise介绍，整理一下Promise的面试点。

> Q1： Promise有那些状态?

在工作中其实一般不会涉及到Promise的状态，但是实际上理解Promise的状态会一些Promise问题的细节会有更深入的了解，也就能回答上Promise相关的看起来很奇怪的问题。

首先，Promise对象有一下两个特点：

1. 对象状态不受外界影响，只有其内部的异步操作可以改变其状态。其状态有3中，`pending`、`rejected`、`fulfilled`，注意，`fulfilled`总被答成resolved。
2. 状态一旦改变就不会再次改变，任何时候都可以得到这个结果。

第2句话会有两个经典的面试题:

> Q2: 在Promise内部，先resolve，再rejected, 请问promise的结果走的是then还是catch?
> Q3: Promise对象内部的异步方法已经resolve了之后，再去调用then方法，then方法会执行吗？

```js
let p = function () {
  return new Promise(function (resolve, reject) {
    setTimeout(function() {
      reject(11);
    }, 1000)
    resolve(22);
    throw new Error(33)
  })
}

let res = p();

setTimeout(function () {
  res.then(function (r) {
    console.log(r)
  }).catch(function (e) {
    console.log(e)
  })
}, 3000)
```

上面的代码3秒后打印`22`, 这里的原因就是这个promise对象状态一旦变成了resolve，其内部的函数再去修改状态也是无效的，而且外部在状态已经发生变更后，再去调用then方法，也是能正常调用的。

> Q4: Promise有什么优缺点？

优点：

1. 避免层层嵌套的回调函数，也就是回调地狱。
2. Promise对象提供统一的接口，使得控制异步操作更加容易

缺点：

1. 无法取消Promise，一旦新建它就会立即执行，无法中途取消。
2. 如果不设置回调函数，Promise内部抛出的错误，不会反应到外部。
3. 当处于pending状态时，无法得知目前进展到哪一个阶段。

针对promise的缺点，就会有一个问题了

> Q5: 如何取消或中断Promise?

说实话，这个问题容易让人误解，以为是问如何在Promise内部取消Promise, 你可以直接回答他promise是无法取消的。

然后向面试官确认是不是想问题在promise内部`reject`或者是想问`Promise.race`。

使用`Promise.race`可以达到将多个promise实例包装成一个Promise实例，然后只返回率先改变的Promise实例。

注意： 如何是都是ajax请求，这些promise实例内部的ajax请求仍然会发出去的，如果要解决这个问题，可能需要在每个实例的内部将ajax暴露出来，调用xmlhttprequest对象的`abort`方法。

> Q6: Promise then里面return false会被catch捕获吗？

不会，Promise的then里面，只有return Promise.reject()和throw new Error的时候，才会被catch捕获到，其它时候，不论是写`return false`还是不写return，都会进入下一个then,如果不写return，下一个then得到的是undefined

另外，在catch的后面，还可以继续写then来执行。

then里面的错误不仅可以被catch捕获，也可以被then的第二个参数，异常回调函数捕获

注意：由于promise的catch会捕获到throw new Error，所以在开发的过程中，常常遇到代码写错了导致抛出错误，被catch捕获了但是没有打印详细错误，导致调试困难。如果不写catch，浏览器会打印错误，但是这个错误不会让脚本终止运行，通俗的说法就是“Promise 会吃掉错误”。

> Q7: Promise的then方法返回的是promise对象是原来的promise对象嘛？

then方法返回的是一个新的Promise实例（注意，不是原来那个Promise实例）。因此可以采用链式写法，即then方法后面再调用另一个then方法。

但是注意，一个promise实例可以被调用多次then方法,返回的结果都一样。但是因为一个promise对象的状态一旦被确定了就不会被修改，所以then方法返回的才是一个新的实例，因为后面的then接收到的数据和前一个then是可以不一样的。

```js
let p = new Promise((resolve) => {
  resolve(33)
})

p.then(r => {
  console.log('r1', r) // r1 33
})

p.then(r => {
  console.log('r2', r) // r2 33
})
```

> Q8: Promise all中的某个实例p2如果有catch方法，那么当这个实例p2报错后，整个Promise.all最终会调用resolve还是reject呢？

会调用resolve，因为这个实例p2最终返回的是catch里面的那个新的实例。

> Q9: 如果不关心成功或者失败，只希望判断所有的请求都已经结束，应该怎么写呢？

使用Promise.all是不行的，因为Promise.all的某个promise变成rejected，那Promise.all的状态就变成rejected了。ES2020提供了一个新的API`Promise.allSettled`方法。这个方法的作用是接受一组 Promise 实例作为参数，包装成一个新的 Promise 实例。只有等到所有这些参数实例都返回结果，不管是fulfilled还是rejected，包装实例才会结束。

>Q10: Promise.any和Promise.race的区别

Promise.any和Promise.race都是接收一组Promise实例，当某个实例状态变成`fulfilled`状态, 那么这个包装实例状态就变成`fulfilled`。但是`Promise.race`在某个实例先变成`rejected`状态时，整个包装实例就变成`rejected`状态结束了，但是`Promise.any`则不会，只有等到所有的实例变成fulfilled状态才会抛出异常，这个异常是所有的异常组成的数组。

> Q11: 请问下面的代码打印的结果是？解释一下为什么？

```js
setTimeout(function () {
  console.log(1)
}, 0);

Promise.resolve(function () {
  console.log(2)
})

new Promise(function (resolve, reject) {
  console.log(3)
  resolve(4)
}).then(r => {
  console.log(r)
})

console.log(5)
```

运行代码可以发现，上面代码的打印结果是`3 5 4 1`, 我们先忽略微任务和宏任务方面的面试点，说说为什么2不打印，而3却要打印呢？

这里我们看看Promise.resolve的参数有哪些情况

（1）参数是一个 Promise实例

那么Promise.resolve将不做任何修改、原封不动地返回这个实例。

（2）参数是一个thenable对象

thenable对象指的是具有then方法的对象

```js
let thenable = {
  then: function(resolve, reject) {
    console.log(2);
  }
};
```

（3）参数不是具有then方法的对象，或根本就不是对象

如果参数是一个原始值，或者是一个不具有then方法的对象，则Promise.resolve方法返回一个新的 Promise 对象，状态为resolved。

（4）不带有任何参数

这种情况一般出现在希望得到一个Promise对象，在then中执行，希望将任务放到微任务中执行。比如vue的nextTick。

所以我们可以发现*Q11*中的打印2其实是情况(3), 返回的一个新的Promise对象，其参数那个function根本不会执行。

注意，Promise.reject()方法的参数，会原封不动地作为reject的理由，变成后续方法的参数。这一点与Promise.resolve方法不一致。

> Q12: 如何将一个函数，不管其是同步还是异步，使用promise来处理它，在then里面得到执行结果？用catch方法处理f抛出的错误。

```js
const f1 = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(3)
      resolve(3)
    }, 1000)
  })
}
(new Promise((resolve) => {
  resolve(f1())
})).then(() => {
  console.log(333)
})
console.log('next')
```

可以使用promise来resolve这个函数的执行结果。因为在Promise中的时候还是同步执行。这个时候执行了这个方法，如果是同步，这直接执行，如果是异步会等其异步执行完成在执行。现在有一个提案，提供Promise.try方法替代上面的写法。

```js
Promise.try(f1);
console.log('next');
```

