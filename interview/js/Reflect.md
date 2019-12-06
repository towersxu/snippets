# Reflect面试点整理

## ES6为什么要新增Reflect对象

Reflect是新增的操作对象的API

1、让命令式操作变成函数式如`name in obj`、`delete obj[name]`等
2、与Proxy方法对应、便于在Proxy里面调用而不会因为proxy修改了默认行为而改变。
3、Reflect可以拿到语言内部的方法,未来这些方法将放到Reflect上，而不是Object对象上。
4、修改某些Object方法的返回结果，让其变得更合理。比如，Object.defineProperty(obj, name, desc)在无法定义属性时，会抛出一个错误，而Reflect.defineProperty(obj, name, desc)则会返回false。

## Reflect有哪些方法

1. `Reflect.get(target, name, receiver)`
2. `Reflect.set(target, name, value, receiver)`
3. `Reflect.has(obj, name)`， 对应name in object的in
4. `Reflect.deleteProperty(obj, name)`, 对应delete obj[name]，用于删除对象的属性。
5. `Reflect.defineProperty(target, propertyKey, attributes)`
6. `Reflect.construct(target, args)` 对应new target(...args),这提供了一种不使用new，来调用构造函数的方法。
7. `Reflect.getPrototypeOf(obj)`
8. `Reflect.setPrototypeOf(obj, newProto)`
9. `Reflect.apply(func, thisArg, args)`
10. `Reflect.getOwnPropertyDescriptor(target, propertyKey)`
11. `Reflect.isExtensible (target)`
12. `Reflect.preventExtensions(target)`
13. `Reflect.ownKeys (target)`

## Reflect和Proxy里面`get`和`set`方法的receiver参数是什么，和target有什么区别

receiver是当前进行属性查找的对象，不一定和target是同一个对象。

但我们同时代理一个对象的get和set的时候，receiver对象表示的是被get修改了后的对象，target表示的是修改前的对象。

```js
function observable(obj) {
  return new Proxy(obj, {
    set (target, name, value, receiver) {
      // {"name":"张三","age":20} {"name":"张三xx","age":"20xx"}
      console.log(JSON.stringify(target), JSON.stringify(receiver))
      let r = Reflect.set(target, name, value, receiver)
      deps.forEach((dep) => {
        Reflect.apply(dep, target, [])
      })
      return r
    },
    get (target, key, receiver) {
      return target[key] + 'xx'
    }
  })
}
```
