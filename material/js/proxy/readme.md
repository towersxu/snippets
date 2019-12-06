# proxy其它属性

- *getPrototypeOf*方法主要用来拦截获取对象原型。具体来说，拦截下面这些操作。

```js
  Object.prototype.__proto__
  Object.prototype.isPrototypeOf()
  Object.getPrototypeOf()
  Reflect.getPrototypeOf()
  instanceof
```

- *isExtensible*方法拦截Object.isExtensible操作。

- *ownKeys*方法用来拦截对象自身属性的读取操作。具体来说，拦截以下操作。

```js
  Object.getOwnPropertyNames()
  Object.getOwnPropertySymbols()
  Object.keys()
  for in
```

- *preventExtensions*方法拦截Object.preventExtensions()。该方法必须返回一个布尔值，否则会被自动转为布尔值。

> Object.preventExtensions()方法让一个对象变的不可扩展，也就是永远不能再添加新的属性。

这个方法有一个限制，只有目标对象不可扩展时（即Object.isExtensible(proxy)为false），proxy.preventExtensions才能返回true，否则会报错。为了防止出现这个问题，通常要在proxy.preventExtensions方法里面，调用一次Object.preventExtensions。

```javascript
  var proxy = new Proxy({}, {
    preventExtensions: function(target) {
      console.log('called');
      Object.preventExtensions(target);
      return true;
    }
  });

  Object.preventExtensions(proxy)
  // "called"
  // Proxy {}
```

- *setPrototypeOf*方法主要用来拦截Object.setPrototypeOf方法。

> Object.setPrototypeOf() 方法设置一个指定的对象的原型 ( 即, 内部[[Prototype]]属性）到另一个对象或  null。
> 警告: 由于现代 JavaScript 引擎优化属性访问所带来的特性的关系，更改对象的 [[Prototype]]在各个浏览器和 JavaScript 引擎上都是一个很慢的操作。其在更改继承的性能上的影响是微妙而又广泛的，这不仅仅限于 obj.__proto__ = ... 语句上的时间花费，而且可能会延伸到任何代码，那些可以访问任何[[Prototype]]已被更改的对象的代码。如果你关心性能，你应该避免设置一个对象的 [[Prototype]]。相反，你应该使用 Object.create()来创建带有你想要的[[Prototype]]的新对象。

## 注意

有些原生对象的内部属性，只有通过正确的this才能拿到，所以 Proxy 也无法代理这些原生对象的属性。

```js
const target = new Date();
const handler = {};
const proxy = new Proxy(target, handler);

proxy.getDate();
// TypeError: this is not a Date object.
```

上面代码中，getDate方法只能在Date对象实例上面拿到，如果this不是Date对象实例就会报错。这时，this绑定原始对象，就可以解决这个问题。

```js
const target = new Date('2015-01-01');
const handler = {
  get(target, prop) {
    if (prop === 'getDate') {
      return target.getDate.bind(target);
    }
    return Reflect.get(target, prop);
  }
};
const proxy = new Proxy(target, handler);

proxy.getDate() // 1
```

## 撤销 Proxy

Proxy.revocable()方法被用来创建可撤销的Proxy对象。这意味着代理可以通过revoke函数来撤销并且关闭代理。此后，代理上的任意的操作都会导致TypeError。

```javascript
var revocable = Proxy.revocable({}, {
  get: function(target, name) {
    return "[[" + name + "]]";
  }
});
var proxy = revocable.proxy;
console.log(proxy.foo); // "[[foo]]"

revocable.revoke();

console.log(proxy.foo); // TypeError is thrown
proxy.foo = 1           // TypeError again
delete proxy.foo;       // still TypeError
typeof proxy            // "object", typeof doesn't trigger any trap
```

## Proxy.revocable的用处

Proxy.revocable的一个使用场景是，目标对象不允许直接访问，必须通过代理访问，一旦访问结束，就收回代理权，不允许再次访问。