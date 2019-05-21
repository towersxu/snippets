// defineProperty方法拦截了Object.defineProperty操作。

// 下面代码中，defineProperty方法返回false，导致添加新属性总是无效。

// 注意，如果目标对象不可扩展（non - extensible），
// 则defineProperty不能增加目标对象上不存在的属性，否则会报错。
// 另外，如果目标对象的某个属性不可写（writable）或不可配置（configurable），
// 则defineProperty方法不得改变这两个设置。

var handler = {
  defineProperty(target, key, descriptor) {
    return false;
  }
};
var target = {};
var proxy = new Proxy(target, handler);
proxy.foo = 'bar' // 不会生效