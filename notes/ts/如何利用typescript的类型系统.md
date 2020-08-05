# typescript的泛型

> 本文并不是typescript类型的语法介绍文章，而是讲讲我们开发人员，如何利用typescript的类型系统的优点，进行更高效的开发。

## typescript内置的类型描述lib.d.ts

当我们使用vscode在ts文件中写代码的时候，代码会自动支持`intellisense`。比如说我们在调用DOM元素的方法的时候，就会自动提供这个元素带有的方法供选择。
![intellisense](https://cdn.jsdelivr.net/gh/towersxu/cdn@latest/snippets/intellisense.png)

这些提示代码是vscode自己集成了typescript内置的基础类型声明，这些声明也是以d.ts的格式写到`lib.d.ts`等文件中。这些文件声明了JavaScript在运行时常见的结构和DOM。
![lib.d.ts.png](https://cdn.jsdelivr.net/gh/towersxu/cdn@latest/snippets/lib.d.ts.png)

所以当我们在写ts遇到不知道改如何声明合适的类型是，可以去看`lib.d.ts`中是如何声明的。以js常见的监听事件为例：

```html
<button id="dpm" a="22" value="33">222</button>
```

```ts
function appendToEle (el: HTMLElement) {
  el.addEventListener('click', (ev: MouseEvent) => {
    let value = (<HTMLButtonElement>ev.target).value
    console.log(value)
  })
}
window.onload = function () {
  appendToEle(document.querySelector('#dpm'))
}
```

从上面的代码可以看到，DOM元素的基础类型是`HTMLElement`, 但是在点击的时候，ev.target类型不能是`HTMLElement`类型，因为它没有`value`属性。这个时候，我们就需要按照实际情况将其转换为运行到此处的类型，也就是`HTMLBottonElement`。在一开始我们不熟悉的时候，我们可能不知道button的类型是`HTMLBottonElement`, 这个时候就可以去`lib.d.ts`中搜索，看基础`HTMLElement`的有哪些类型。当然这是一个笨办法，需要搜索。但是当你熟悉了后，则不需要搜索了。

![HtmlButtonElement](https://cdn.jsdelivr.net/gh/towersxu/cdn@latest/snippets/HtmlButtonElement.png)

## 从lib.d.ts中学习类型写法

### `addEventListener`的类型定义

typescript的类型其中一个作用是我们可以自定义约束，使其满足代码在运行的时候的特殊逻辑。这里以`HTMLElement`的`addEventListener`为例：

```ts
interface GlobalEventHandlersEventMap {
  // ...
  "change": Event;
  "keyup": KeyboardEvent;
  "click": MouseEvent;
}

interface HTMLElementEventMap extends
  ElementEventMap,
  GlobalEventHandlersEventMap,
  DocumentAndElementEventHandlersEventMap {
}

interface HTMLElement {
  // ...
  addEventListener<K extends keyof HTMLElementEventMap>(
    type: K,
    listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any, 
    options?: boolean | AddEventListenerOptions
  ): void;
}
```

这里首先看我们太认识的`<K extends keyof HTMLElementEventMap>`。这里是一个泛型的概念。
那什么时候我们会用到泛型呢？

我觉得可以这样理解，有的代码中，变量的类型可能并不是一个简单的`string`,`object`类型，而是需要符合一定的约束的类型。
这个约束需要在代码的多个地方涉及到。

以上面的`addEventListener`为例。我们知道，`addEventListener`方法的type可以是DOM节点自带的支持的监听方法，比如`click`, `keyup`等，这里type虽然是字符串，但是`click`和`keyup`对应的回调函数返回值是不一样的。`keyup`对应的回调函数返回值有按键相关信息，比如`keyCode`。`click`则有鼠标相关信息，比如点击位置。

所以我们首先需要一个`GlobalEventHandlersEventMap`将不同的字符和对应不同的返回类型。然后在写`addEventListener`的时候，声明一个变量`K`是`GlobalEventHandlersEventMap`的`K`, 对应的回调函数返回的值是`GlobalEventHandlersEventMap`这个`K`对应的值，也就是`HTMLElementEventMap[K]`

### `Promise`的类型定义

**再举一个例子🌰**

我们经常写`Promise`, 那Promise对象的类型应该怎么描述呢？

```ts
interface PromiseConstructor {
  new <T>(
    executor: 
      (
        resolve: (
          value?: T | PromiseLike<T>
        ) => void, 
        reject: (
          reason?: any
        ) => void
      ) => void
  ): Promise<T>;
}
declare var Promise: PromiseConstructor;

interface Promise<T> {
  then<TResult1 = T, TResult2 = never>(
    onfulfilled?: (
      (value: T) => TResult1 | PromiseLike<TResult1>
    ) | undefined | null, 
    // ...
  ): Promise<TResult1 | TResult2>;
}

// 使用
let a = new Promise((resolve, reject) => {
  resolve(33)
})

a.then((r) => {
  console.log(3) // 33
})
```

我们对照使用的方法来看上面的类型描述，`new Promise`这种用法表示Promise对象是可以通过`new`运算符调用的。

1. 所以我们创建了一个`PromiseConstructor`的接口，然后`declare var Promise: PromiseConstructor;`告知全局变量`Promise`是一个`PromiseConstructor`构造函数。为了要让这个`Promise`被`new`运算符调用，我们需要在`PromiseConstructor`中声明其支持`new`, 也就是上面代码的第二行。并且告知typescript静态类型检测系统其返回值的类型是`Promise<T>`。

2. 关于`Promise<T>`的具体定义我们后面再说，我们先看构造函数的参数，也就是`new()`括号里面部分。`executor`表示自定义的名字，和我们平时定义的普通函数`function (executor: number)`里面的一样。在`new`里面的`executor`是一个返回类型为`void`的回调函数。这个回调函数的参数有两个，一个`resolve`,一个`reject`。都是返回类型为`void`的函数。`resolve`就是我们平时习惯在`promise`中的写的`resolve`了。他的参数是我们开发的时候自定定义的，可以是任何类型。那这里为什么不用`any`而是采用`value?: T | PromiseLike<T>`这种写法呢？这就要说到我们下面的`Promise<T>`了。

3. 我们知道`Promise<T>`表示的`new Promise()`返回的`Promise`对象。`Promise`对象有`then`和`catch`方法。其中`then`方法的第一个参数是个函数`onfulfilled`, 这个函数就是上面的`resolve`。这里我们就联系起来了，上面resolve的参数就是`onfulfilled`的参数，是同一个东西。我们在最上面说过，typescript增加泛型的目的是更好的描述类型被约束的情况。这里我们也有一个约束，那就`PromiseConstructor`中`resolve`函数参数的值和`Promise<T>`中`onfullfilled`函数参数的值是同一个值。所以我们在new后面使用`<T>`声明这个泛型变量。然后通过`Promise<T>`将两部分联系起来。

**Q: 这里使用`PromiseConstructor`为什么不直接用`interface Promise`的类型声明方式?**

因为Promise事实上在运行环境上已经有了，不需要我们再来实现一个`class Promise`。所以这个时候我们需要用构造函数的类型声明方式告知typescript静态类型检查机制，我们在代码中`new Promise`调用方式是合法的。

当然，在我们实际的开发中，使用`new`运算符这种声明类型主要用处还是用在`class`被当做参数传递的情况。具体可以看typescript官方文档[interfaces](https://www.typescriptlang.org/docs/handbook/interfaces.html)

## 一些不容易理解的例子


- 如果我们想要定义一个特殊对象，这个对象的key是string, 值是一种统一的类型。也就是值可以全是数字，也可以全是字符串。当然，在实际开发中，可能是要求全是某种对象，比如要么全是男的`Man`，要么全是女的`Woman`。这个时候，我们应该怎么定义这种特殊对象的类型呢？

```ts
interface Dictionary<T> {
  [index: string]: T;
};

let man1 = new Man()
let man2 = new Man()

const manData: Dictionary<Man> = {
  'first': man1,
  'second': man2,
}

let woman1 = new Woman()
let woman2 = new Woman()

const womanData: Dictionary<Man> = {
  'first': woman1,
  'second': woman2,
}
```

从上面的代码可以看出，我们首先定义了一种类型`Dictionary<T>`, 这种类型的值是一个泛型。
然后后面的具体使用的饿时候，我们再进一步其详细类型。

同理的还有`Record`, 我们在某些ts项目中，有点eslint，要求我们不要使用`Object`， 而是使用`Record<string, any>`来替代.

因为`Record`已经在`lib.d.ts`中提前定义好了。具体定义如下:

```ts
type Record<K extends keyof any, T> = {
  [P in K]: T;
};
```


