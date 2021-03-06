# Number相关面试题整理

## Q1: 如何在js里面直接写`二进制`、`八进制`、`十六进制`的数字

```js
0b100
0o100
0x100
```

## Q2: 如何判断一个值是否是`NaN`

ES5只有通过`a !== a`来判断，ES6提供了`Number.isNaN`来判断

## Q3: js中数字有效的范围是多少？如何判断一个数字的值是否在数字的有效范围中

js中finite的范围是2的1024次方-1（2**1024 -1），可以用`Number.MAX_VALUE`表示。
可以通过`Number.isFinite()`方法来判断。

## Q4: 数字的最大值和最大安全整数有什么区别，如何判断一个数是安全整数

最大安全整数的范围是(-2的53次方)到(2的53次方)之间，超过了这个范围无法准确表示。比如

```js
console.log(2**53 + 1 === 2**53) // true
```

在ES6中，提供了方法Number.MAX_VALUE来获取最大安全整数。Number.MIN_VALUE来获取最小安全整数

可以使用`Number.isSafeInteger`来判断一个数是否在安全整数。

## Q5: `Number.EPSILON`有什么用

Number.EPSILON实际上是 JavaScript 能够表示的最小精度。误差如果小于这个值，就可以认为已经没有意义了，即不存在误差了。引入一个这么小的量的目的，在于为浮点数计算，设置一个误差范围。

对于 64 位浮点数来说，大于 1 的最小浮点数相当于二进制的1.00..001，小数点后面有连续 51 个零。这个值减去 1 之后，就等于 2 的 -52 次方。

## Q6: 如何去掉一个数的小数部分

ES6新增Math.trunc方法

```js
Math.trunc = Math.trunc || function (x) {
  return x < 0 ? Math.ceil(x) : Math.floor(x)
}
```

## Q7: 如何求一个数的立方根、平方根

ES6新增方法cbrt

```js
Math.cbrt = Math.cbrt || function (x) {
  var y = Math.pow(Math.abs(x), 1 / 3)
  return x < 0 ? -y : y
}
```

从polyfill可以发现，如果求一个元素的立方根等同于其1/3次方。同理，平方根是1/2次方（Math.sqrt）。

## Q8: Math.imul有什么用？为什么不直接用`*`来乘

`Math.imul`方法返回两个数以 32 位带符号整数形式相乘的结果，返回的也是一个 32 位的带符号整数。

Math.imul可以进行快速的,类C语义的32位整数乘法.该特性对于一些项目比如Emscripten很有用.

如果只考虑最后 32 位，大多数情况下，Math.imul(a, b)与a * b的结果是相同的，即该方法等同于(a * b)|0的效果（超过 32 位的部分溢出）。之所以需要部署这个方法，是因为 JavaScript 有精度限制，超过 2 的 53 次方的值无法精确表示。这就是说，对于那些很大的数的乘法，低位数值往往都是不精确的，Math.imul方法可以返回正确的低位数值。

为什么Math.imul(0x7fffffff, 0x7fffffff)的结果为1

0x7fffffff是32位在表示符号整数内能表示的最大正整数了，是`2^31 - 1`

Math.imul就是相乘。

平方得结果为`2^64 - 2 ^ 33 + 1`

其中前两项都会由于32位无法表示舍去，只有最后的1可以用32位表示出来。

能得出这么大数字相乘的正确表示结果也是es6专门引进此方法的原因。

## Q9: Math.fround是什么，有什么用

Math.fround() 可以将任意的数字转换为离它最近的单精度浮点数形式的数字。

JavaScript 内部使用64位的双浮点数字，支持很高的精度。但是，有时你需要用32位浮点数字，比如你从一个Float32Array 读取值时。这时会产生混乱：检查一个64位浮点数和一个32位浮点数是否相等会失败，即使二个数字几乎一模一样。

```js
Math.fround(1.5); // 1.5
Math.fround(1.5) === 1.5; // true
Math.fround(1.337); // 1.3370000123977661
Math.fround(1.337) === 1.337; // false
```

在某些精度不高的场合下，可以通过将二个浮点数转换成32位浮点数进行比较，以解决64位浮点数比较结果不正确的问题

```js
0.1 + 0.2 == 0.3;    //false
function equal(v1, v2) {
  return Math.fround(v1) == Math.fround(v2);
}
equal(0.1 + 0.2, 0.3);   //true
```

## `2 ** 3 ** 2`返回的结果是

指数运算符的特点是右结合，而不是常见的左结合。所以`2**3**2`等于`2**9`为512

V8 引擎的指数运算符与Math.pow的实现不相同，对于特别大的运算结果，两者会有细微的差异。

## 字符串与数字相加、对象与数字相加，其中的类型转换规则是什么

对象调用valueOf方法, 数组调用join方法, 如果两边都是数字，直接相加。否则转换为字符串相加。

## `{} + []`和`[] + {}`相等吗

在Chrome 控制台中

```js
{} + [] // 0
[] + {} // [object object]
{} + [] === [] + {} // true
```

这里是Chrome的控制台的问题。
[https://stackoverflow.com/questions/41124252/why-does-evaluate-to-true](https://stackoverflow.com/questions/41124252/why-does-evaluate-to-true)
