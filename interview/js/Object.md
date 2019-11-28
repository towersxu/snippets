# 对象

> Q1: Object.keys(a)、Object.getOwnPropertyNames(a)、Reflect.ownKeys(a)以及for in的区别？

```js
console.log(Oject.keys(c)) // 获取对象上正常的属性
console.log(Object.getOwnPropertyNames(c)) // 还可以获取不可迭代属性，既enumerable无false的属性
console.log(Reflect.ownKeys(c)) // 处理可以获取不可迭代属性，还可以获取Symbol属性

for (let a in c) { // 可以获取原型属性，但是不可获取不可迭代和Symbol对象。但是无法获取不可迭代属性和Symbol属性
  console.log(a)
}
```

可以使用`Object.getOwnPropertySymbols(c)`获取对象上所有的Symbols属性

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

> Q4: Object.assign的参数可以不是对象嘛？

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

> 下面代码运行结果是？

```js
const source = {
  get foo() { return 1 }
};
const target = {};
var r = Object.assign(target, source);
console.log(r)
```

结果是`{foo: 1}`,Object.assign只能进行值的复制，如果要复制的值是一个取值函数，那么将求值后再复制。