# class

## 如何向一个现成的class添加新的方法

在class的prototype上添加

```js
class Point {
  constructor (){
  }
}

Object.assign(Point.prototye, {
  toString () {}
})
```

注意：类的内部所有定义的方法，都是不可枚举的（non-enumerable）。
包括Object.assign后来新增的。如果是在ES5中，给function的prototype添加方法，
则是可枚举的。

## class必须要用new调用，如果在ES5中模拟这个特性

使用`new.target`判断，如果没有new.target，则表示不是使用new调用.

在不支持`new.target`的环境，可以采用`this instanceof Fun`来判断

```js
function Person() {
  if (!new.target) {
    throw new Error('xxx')
  }
}
function Tes () {
  if (!(this instanceof Tes)) {
    throw new Error('44')
  }
}

```

## 如何判断一个类是否继承了另一个类

```js
Object.getPrototypeOf(ColorPoint) === Point
```

## class里面的方法还可以用use strict吗

类和模块的内部，默认就是严格模式，所以不需要使用use strict指定运行模式。
只要你的代码写在类或模块之中，就只有严格模式可用。
考虑到未来所有的代码，其实都是运行在模块之中，所以 ES6 实际上把整个语言升级到了严格模式。

## class里面的方法的this一定指向的类的实例吗

不一定，如果把方法单独使用，this会指向改方法所运行的环境（由于class内部是严格模式，所以this实际指向的是undefined）

如何解决上面这个问题？

比较简单的方法是在构造函数中使用bind绑定this(react处理this的一种方案)

当然使用箭头函数也可以解决这个问题

## class的static方法能用this吗

能，this指向的是class本地，也能继续调class的其它static方法

```js
class Point {
  ae = 2;
  static asx = 3;
  getName () {
    return 3333 + this.ae
  }
  static getName () {
    return this.getAge() + this.asx
  }
  static getAge () {
    return 444
  }
}
```

## class继承的时候super指向的是什么

super指向父类的原型对象，所以定义在父类实例上的方法或属性，是无法通过super调用的。

如果属性定义在父类的原型对象上，super就可以取到。

## 子类普通方法中通过super调用父类的方法时，父类方法中的this指向的是什么

指向的是当前子类的实例

## 为什么ES6可以自定义原生数据结构（比如Array、String等）的子类，而`ES5`无法做到的

ES5 是先新建子类的实例对象this，再将父类的属性添加到子类上，由于父类的内部属性无法获取，导致无法继承原生的构造函数。比如，Array构造函数有一个内部属性`[[DefineOwnProperty]]`，用来定义新属性时，更新length属性，这个内部属性无法在子类获取，导致子类的length属性行为不正常。

ES6 允许继承原生构造函数定义子类，因为 ES6 是先新建父类的实例对象this，然后再用子类的构造函数修饰this，使得父类的所有行为都可以继承。
