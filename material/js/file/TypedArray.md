# TypedArray

一个TypedArray 对象描述一个底层的二进制数据缓存区的一个类似数组(array-like)视图。事实上，没有名为 TypedArray的全局对象，也没有一个名为的 TypedArray构造函数。相反，有许多不同的全局对象，下面会列出这些针对特定元素类型的类型化数组的构造函数。

ECMAScript 6定义TypeArray构造器作为所有的类型化数组构造器(Int8Array,Int16Array等)的原型.该构造器不会直接暴露:没有全局的%TypedArray%和TypeArray属性.只能通过使用类似Object.getPrototypeOf(Int8Array.prototype)的方式进行访问.所有的类型化数组构造器(Int8Array,Int16Array等)都会继承TypeArray构造器的通用属性和方法.此外,所有的类型化数组原型(Int8Array.prototype,Int16Array.prototype等)的原型都以TypeArray.prototype作为原型.

TypedArray对象有Int8Array、UInt8Array对象、Float32Array对象等...
