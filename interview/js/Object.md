# ES6对象面试题整理

> Q1: Object.keys(a)、Object.getOwnPropertyNames(a)、Reflect.ownKeys(a)以及for in、Object.getOwnPropertyDescriptors的区别？

```js
console.log(Oject.keys(c)) // 获取对象上正常的属性, 不包括Symbol属性，但是不包括enumerable属性
console.log(Object.getOwnPropertyNames(c)) // 还可以获取不可迭代属性，既enumerable无false的属性
console.log(Reflect.ownKeys(c)) // 处理可以获取不可迭代属性，还可以获取Symbol属性

for (let a in c) { // 可以获取原型属性，但是不可获取不可迭代和Symbol对象。但是无法获取不可迭代属性和Symbol属性
  console.log(a)
}
```

可以使用`Object.getOwnPropertySymbols(c)`获取对象上所有的Symbols属性。

Object.getOwnPropertyDescriptors是获取一个对象的所有的属性的描述符。

> Q2: 在ES6中，如何实现私有属性

使用Symbol，利用Symbol的唯一性，只要这个不对外暴露Symbol的索引，那么Symbol就不会被访问带

在es next里面提供了private属性，使用#表示

> Q3: Object.is有什么用，和===有什么区别？

`Object.is`可以判断NaN等于自身，而`+0`不等于`-0`

```js
+0 === -0 //true
NaN === NaN // false
Object.is(+0, -0) // false
Object.is(NaN, NaN) // true
```

> Q4: Object.assign的参数可以不是对象吗？

可以，参数不对，会尝试将其转换为对象，但是如果是null和undefined无法转换为对象，所以它们作为参数会报错。
如果非对象参数出现在源对象的位置（即非首参数），那么处理规则有所不同。
首先，这些参数都会转成对象，如果无法转成对象，就会跳过。
这意味着，如果undefined和null不在首参数，就不会报错。
所以，很多时候为了安全我们会这样写：

```js
var o = Object.assign({}, a, b)
```

> Q5: Object.assign可以拷贝原型链上的属性吗？不可枚举的呢？Symbol呢？

`Object.assign`只可以拷贝源对象自身的属性，不拷贝继承属性，也不拷贝不可枚举属性，但是可以拷贝Symbol属性。

> Q6: Object.assign可以用在数组上吗？

是可以的，数组会被当做对象

```js
var c = Object([1,2,3,4,5], [9,8,7]) // [9,8,7,4,5]
```

> Q7.下面代码运行结果是？

```js
const source = {
  get foo() { return 1 }
};
const target = {};
var r = Object.assign(target, source);
console.log(r)
```

结果是`{foo: 1}`,Object.assign只能进行值的复制，如果要复制的值是一个取值函数，那么将求值后再复制。

> Q8. Object.assign能拷贝get和set属性吗，Symbol和enumerable为false的属性呢？

不能，这是因为Object.assign方法总是拷贝一个属性的值，而不会拷贝它背后的赋值方法或取值方法。
所以，如果是get方法，拷贝的内容是一个get方法返回的值，如果是set方法，拷贝的值则是undefined。
属性名会被拷贝。Symbol是可以拷贝的，但是enumerablle为false的不行。

> Q9. 如果想要拷贝一个对象，并且还想合并其get和set之类所有的属性怎么做？

可以使用`Object.getOwnPropertyDescriptors()`方法配合`Object.defineProperties()`方法，就可以实现拷贝get和set方法。

```js
Object.defineProperties({}, Object.getOwnPropertyDescriptors(o));
```

同理，Object.assign也不能复制enumerable为false的属性，但是defineProperties可以。

注意，这里如果只是希望单纯的拷贝，而不是类似`Object.assign`带有合并的功能，可以使用`Object.create`。
使用`Object.create`的有点在于可以将第一个参数设置为对象的原型，这样拷贝的对象也和源对象具有同样的原型链。

```js
Object.create(
  Object.getPrototypeOf(o),
  Object.getOwnPropertyDescriptors(o)
);
```

> Q10: 如何将一个对象设置为另一个对象的原型？

在以前，我们可以通过__proto__这种方法来指定一个对象是另一个对象的原型，但是这种用法并不是js的规范，只是一个内部属性。
虽然大部分浏览器和nodejs引擎实现了这种写法，当一般不推荐这样用。
在ES6中新加了setPrototypeOf，可以直接实现这个需求。

> Q11: 如何使用for of遍历对象，能遍历到原型链上的对象吗？能遍历enumerable为false的属性吗？能遍历Symbol吗？

对象本地是不可迭代的，但是可以使用Object.keys、Object.values、Object.entries获取对象的属性和值组成的数组。
他们都不包括enumerable为false和Symbol()的属性。

注意：数组也有keys、values、entries三个方法。但是数组可以直接for of遍历。Set也是这样。

> Q12: Map与Object的区别是？

Map和Object都是键值对的集合（Hash结构），但是Map支持各种类型的值作为键。包括对象。
Map判断键是否相同，采用的是判断是地址是否是同一个地址，这样的优点是对别人的库进行扩展的时候，
如果采用对象作为键，则不会对别人的库进行污染。

当然：一般这种情况要对象的扩展，我们可以用Symbol

Map还可以使用for of对齐进行遍历，而Object不可以。

> Q13: Symbol的描述有什么用

在Symbol作为一个对象的函数的key的时候，这个函数的name属性返回的是Symbol值的描述

```js
var key = Symbol('description')
var ob = {
  [key] () {}
}
console.log(ob[key].name) // [description]
console.log(key.toString()) // Symbol(desription)

```

> Q14: 可枚举属性enumerable被设置为false，会影响那些情况

1. 无法被`for...in`循环遍历
2. 无法被`Object.keys`获取属性
3. 无法被JSON.stringify序列化
4. 无法被`Object.assign`克隆
  
ES6规定，Class的原型的方法都是不可枚举的。

> q15: `super`只能用到class的constructor中吗

不是，super还可以用到直接对象的方法里面，用来指对象。

```js
const proto = {
  foo: 'hello'
};
const obj = {
  foo: 'world',
  find() {
    return super.foo;
  }
};
Object.setPrototypeOf(obj, proto);
obj.find() // "hello"
```

注意，super关键字表示原型对象时，只能用在对象的方法之中，用在其他地方都会报错。

JavaScript 引擎内部，super.foo等同于Object.getPrototypeOf(this).foo（属性）或Object.getPrototypeOf(this).foo.call(this)（方法）。
