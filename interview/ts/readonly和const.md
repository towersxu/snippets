# readonly和const

typescript中readonly有什么用？它和const有什么区别？

typescript只读属性

```ts
interface Point {
  readonly x: number;
  readonly y: number;
}
```

## 你了解装饰器中的@readonly吗

假设需要你来实现装饰器@readonly的polyfill，你的思路是啥？

首先，@readonly这种写法肯定是不兼容不支持的环境的，会报错。所以可以使用babel来编写一个对于的插件，将其转换成es5.

在es5中的只读，首先想到的是descriptor可以设置writable=false来做。这个是对属性的readonly。

如果要想整个对象都readonly, Object.frozen?（这个需要查一下，不确定）

如果想要对方法readonly? 可以让方法绑定对象属性，来当做属性的readonly?

定义了属性writable后，对其赋值并不会报错。如果想要对readonly的属性赋值就报错，可以使用set?

对于对象的属性设置其值为writable，如果这个属性的值也是一个对象，那么还是可以对这个对象的属性进行修改的。
