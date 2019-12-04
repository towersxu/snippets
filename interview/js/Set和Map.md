# Set和Map

## 求两个Set的并集、交集和差集

```js
let a = new Set([1, 2, 3]);
let b = new Set([5, 4, 3, 2]);
// 并集
let union = new Set([...a, ...b]); // Set {1, 2, 3, 4}
// 交集
let intersect = new Set([...a].filter(x => b.has(x))); // set {2, 3}
// A与B的差集
let difference = new Set([...a].filter(x => !b.has(x)));
```

## WeakSet的成员能是数字吗

不能，WeakSet的成员只能是对象

因此 ES6 规定 WeakSet 不可遍历。

WeakSet 的一个用处，是储存 DOM 节点，而不用担心这些节点从文档移除时，会引发内存泄漏。

## WeakMap在实际开发中有那些使用场景

WeakMap的专用场合就是，它的键所对应的对象，可能会在将来消失。WeakMap结构有助于防止内存泄漏。

WeakMap 弱引用的只是键名，而不是键值。键值依然是正常引用。

WeakMap只有四个方法可用：get()、set()、has()、delete()。

WeakMap 应用的典型场合就是 DOM 节点作为键名。

WeakMap 的另一个用处是部署私有属性。

```js
const _counter = new WeakMap();
const _action = new WeakMap();

class Countdown {
  constructor(counter, action) {
    _counter.set(this, counter);
    _action.set(this, action);
  }
  dec() {
    let counter = _counter.get(this);
    if (counter < 1) return;
    counter--;
    _counter.set(this, counter);
    if (counter === 0) {
      _action.get(this)();
    }
  }
}

const c = new Countdown(2, () => console.log('DONE'));

c.dec()
c.dec()
```
