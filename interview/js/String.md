# ES6字符串面试题整理

## Q1: js如何表示超出\uFFFF范围的字符串

在ES6之前，只能使用双字节表示,在ES6之后，可以使用大括号的形式。

```js
'\uD842\uDFB7' === '\u{20BB7}' // true
```

## Q2：服务器输出的格式正确的JSON什么情况下会被JSON.parse报错

JavaScript 规定有5个字符，不能在字符串里面直接使用，只能使用转义形式。

- U+005C：反斜杠（reverse solidus)
- U+000D：回车（carriage return）
- U+2028：行分隔符（line separator）
- U+2029：段分隔符（paragraph separator）
- U+000A：换行符（line feed）

但是JSON 格式允许字符串里面直接使用 U+2028（行分隔符）和 U+2029（段分隔符）。
这样一来，服务器输出的 JSON 被JSON.parse解析，就有可能直接报错。

ES2019 允许 JavaScript 字符串直接输入 U+2028（行分隔符）和 U+2029（段分隔符）。

## Q3: 请解释一下这段代码是什么意思，为什么可以这样写

```js
let sender = 'xutao';
let reciver = 'xxdu';
let msg = SaferHTML`<p>${sender} has send ${reciver} a message</p>`
```

这个是模板字符串的**标签模板**功能，即模板字符串紧跟着函数名称后面，这样如果模板字符串里面有变量，
就会把模板字符串先处理成多个参数，在调用函数。

上面的写法中SaferHTML函数的内容为：

```js
function SaferHTML(strs, ...values) {
  console.log(strs); // [ '<p>', ' has send ', ' a message</p>' ]
  console.log(values); // [ 'xutao', 'xxdu' ]
}
```

标签模板常见用处有过滤字符串、国际化、模拟Mustache 之类的模板库、以及jsx的实现等。

## Q4: String.fromCharCode()和String.fromCodePoint()的区别

ES5 提供`String.fromCharCode()`方法，用于从 Unicode 码点返回对应字符，但是这个方法不能识别码点大于0xFFFF的字符。

所以ES6提供了`String.fromCodePoint()`，可以识别大于0xFFFF的字符，弥补了String.fromCharCode()方法的不足。

另外，String.prototype.codePointAt()方法正好相反，返回一个字符串的某一位的unicode码。

## Q5: String.raw有什么用处

String.raw()方法可以作为处理模板字符串的基本方法，它会将所有变量替换，而且对斜杠进行转义，方便下一步作为字符串来使用。

## Q6: 如何获取“含有四个字节unicode字符的字符串”的长度

利用扩展运算符，将字符串转换为字符数组

也可以用Array.from将字符串转换成字符数组

```js
let str = '你有🚀🚢';
console.log(str.length); // 8
console.log([...str].length); // 6
```

## Q7: 如何判断一个字符是两个字节还是由四个字节组成的

利用`codePointAt()`获取字符的unicode码，如果unicode码大于0xFFFF,则是四个字节组成。

```js
  function is32Bit(c) {
    return c.codePointAt(0) > 0xFFFF; // 向右移位0xFFFF,如果还有值，那肯定大于0xFFFF
  }
```

## Q8: 字符串的normalize方法有什么用

ES6 提供字符串实例的normalize()方法，用来将字符的不同表示方法统一为同样的形式，这称为 Unicode 正规化。

这个一般出现在欧洲的带有重音的字符表示上

```js
'\u01D1'.normalize() === '\u004F\u030C'.normalize()
```

## Q9: includes、startsWith、endsWith的区别

这三个方法都查找字符串中是否包含另一个字符串，都返回boolean，只是判断位置不一样。
都可以传第二个参数，其中endsWith是针对第二个参数之前的。

## Q10: ES还有那些新的字符串的方法

repeat、padStart、padEnd、trimStart、trimEnd、matchAll
