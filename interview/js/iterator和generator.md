# iterator和generator

## 请手写一个实现一个对象可遍历的方法

```js
var obj = {
  age: 0,
  [Symbol.iterator]() {
    return {
      next: () => {
        if (this.age < 3) {
          this.age++
          return { value: this.age }
        }
        return { done: true }
      }
    }
  }
}
```

## 如何处理iterator遍历中断和异常

`[Symbol.iterator]`返回的对象除了next方法,
还可以带有`return`和`throw`方法，`return`方法会在遍历因为异常或者return的时候触发。
如果一个对象在完成遍历前，需要清理或释放资源，就可以部署return方法。

throw方法主要是配合 Generator 函数使用，一般的遍历器对象用不到这个方法。

## `for...of`、`for...in`、`forEach`、`for`循环的异同

首先forEach无法跳出循环,break和return都不生效。

`for...in`只能遍历数组的键名、可以遍历对象，但是还包含原型上的对象。

`for`循环只能遍历数组或者类数组

`for...of`是ES6提供的新统一遍历方式

## 什么是generator

generator是函数后面跟一个`*`号，内部可以用`yield`来在函数执行到此处的时候中断，必须要等其再次调用next的时候才能继续执行。

generator函数返回的是iterator对象，可以使用调用iterator的方式调用generator函数。

## yield表达式有返回值吗

yield返回的不是表达式的执行结果，而是下次再调用next的时候传入的参数。

这个功能使得可以在 Generator 函数运行的不同阶段，从外部向内部注入不同的值，从而调整函数行为。

```js
function* f() {
  let r = yield (2 + 3);
  console.log(r); // 4
}
var g = f();
g.next()
g.next(4)
```

注意，由于next方法的参数表示上一个yield表达式的返回值，所以在第一次使用next方法时，传递参数是无效的。

从语义上讲，第一个next方法用来启动遍历器对象，所以不用带有参数。

## generator怎么实现在外部调用的过程中，向其内部抛出异常

在外部，我们除了可以调用`next`方法，还可以调用`throw`方法，并且可以传递参数

Generator 函数内部没有部署try...catch代码块，那么throw方法抛出的错误，将被外部try...catch代码块捕获。

如果外部也没有，则中断

```js
function* f() {
  let error = false;
  try {
    yield 3;
    console.log('do yield 3')
  } catch (e){
    error = true
    console.log('error from yield 3', e) // error from yield 3 88
  }
  if (error) {
    yield 4
    console.log('do yield 4') // do yield 4
  } else {
    yield 6
    console.log('do yield 6')
  }
}
var g = f();
g.next()
g.throw(88)
g.next()
```

Generator 函数返回的遍历器对象，还有一个return方法，可以返回给定的值，并且终结遍历 Generator 函数。

Generator 函数内部有try...finally代码块，且正在执行try代码块，那么return方法会导致立刻进入finally代码块，执行完以后，整个函数才会结束。

## 如何让Generator函数返回一个正常的对象实例，既可以用next方法，又可以获得正常的this

可以是构造函数返回一个generator对象，这个对象是genrator函数绑定到其原型上的。

```js
function* gen() {
  this.a = 1;
  yield this.b = 2;
  yield this.c = 3;
}
function F() {
  return gen.call(gen.prototype);
}
var f = new F();
f.next();  // Object {value: 2, done: false}
f.next();  // Object {value: 3, done: false}
f.next();  // Object {value: undefined, done: true}
f.a // 1
f.b // 2
f.c // 3
```

## generator有什么用

1. 状态机
2. 新的异步处理方式

## async与generator的区别

async可以看做是generator自动执行的语法糖。

async函数对 Generator 函数的改进，体现在以下四点。

- 内置执行器：Generator 函数的执行必须靠执行器，所以才有了co模块，而async函数自带执行器。
- 更好的语义：async和await，比起星号和yield，语义更清楚了。async表示函数里有异步操作，await表示紧跟在后面的表达式需要等待结果。
- 更广的适用性：async函数的await命令后面，可以是 Promise 对象和原始类型的值
- async函数的返回值是 Promise 对象，这比 Generator 函数的返回值是 Iterator 对象方便。

## 如何使用async实现请求失败重复指定次数再次请求

```js
const superagent = require('superagent');
const NUM_RETRIES = 3;

async function test() {
  let i;
  for (i = 0; i < NUM_RETRIES; ++i) {
    try {
      await superagent.get('http://google.com/this-throws-an-error');
      break;
    } catch(err) {}
  }
  console.log(i); // 3
}
test();
```

## await是继发关系，那么如何用await实现多个请求并发

可以把异步函数当做普通函数调用，然后再用await去调用。

还可以用promise.all

```js
async function getAll () {
  let d = new Date().getTime()
  let age = getAge()
  let use = getUser()
  let r1 = await age;
  let r2 = await use;
  console.log(r1, r2)
  console.log(new Date().getTime() - d)
}
```

## 什么是异步遍历器

ES2018 引入了“异步遍历器”（Async Iterator），为异步操作提供原生的遍历器接口，即value和done这两个属性都是异步产生。

异步遍历器的最大的语法特点，就是调用遍历器的next方法，返回的是一个 Promise 对象。

```js
async function* createAsyncIterable(iterable) {
  for (const elem of iterable) {
    yield elem;
  }
}
function getName () {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(3000)
    }, 3000)
  })
}
function getAge() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(4000)
    }, 8000)
  })
}
const asyncIterable = createAsyncIterable([getName(), getAge()]);
const asyncIterator = asyncIterable[Symbol.asyncIterator]();
async function f () {
  console.log(await asyncIterator.next())
  console.log(await asyncIterator.next())
  console.log(await asyncIterator.next())
}
f()
```

从上面的代码可以看到使用`async function*`的方法返回一个AsyncGenerator对象，然后可以通过Symbol.asyncIterator对其进行遍历。

这里的`async function *`就是异步Generator函数，异步 Generator 函数就是async函数与 Generator 函数的结合。

对应AsyncGenrator对象，也可以用for await...of循环

```js
async function f() {
  for await (const x of asyncIterable) {
    console.log(x);
  }
}
f()
```
