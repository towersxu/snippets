# 数组

## Array.from可以转化那些类型的数据为数组，在转换的过程中，能对其进行修改吗

Array.from可以把部署了Iterator的数据结构转换为数组。
在转换的过程中，第二个参数提供了类似map的功能，可以对其进行修改。

## Array.of有什么用

Array.of方法用于将一组值，转换为数组。这个方法主要是为了解决new Array不一致的问题。

```js
Array.of(3) // [3]
Array.of(3, 4,5) // [3,4,5]

new Array(3) // [,,]
new Array(3,4,5) // [3,4,5]
```

## 数组方法copyWithin有什么用

数组实例的copyWithin()方法，在当前数组内部，将指定位置的成员复制到其他位置（会覆盖原有成员），然后返回当前数组。也就是说，使用这个方法，会修改当前数组。

## 数组方法fill会覆盖数组的原有值吗

fill方法使用给定值，填充一个数组。会覆盖数组中原有的值。

## 如何判断一个值是否在数组中

ES5我们常常用indexOf是否等于-1来判断，ES6新增了includes方法来判断

## flat和flapMap有什么用

flat是将数组拍平、参数是拍平的深度，设置为`infinity`可以将所有的内部数组都拍平。

flatMap()方法对原数组的每个成员执行一个函数（相当于执行Array.prototype.map()），然后对返回值组成的数组执行flat()方法。该方法返回一个新数组，不改变原数组。

flatMap()方法的参数是一个遍历函数，该函数可以接受三个参数，分别是当前数组成员、当前数组成员的位置（从零开始）、原数组。

flatMap()方法还可以有第二个参数，用来绑定遍历函数里面的this。

## 数组中的空位可以被遍历到吗

空位不是undefined，一个位置的值等于undefined，依然是有值的。

在ES5中，大多数情况下会忽略空位。

forEach(), filter(), reduce(), every() 和some()都会跳过空位。

map()会跳过空位，但会保留这个值

join()和toString()会将空位视为undefined，而undefined和null会被处理成空字符串。

ES6 则是明确将空位转为undefined。

Array.from方法会将数组的空位，转为undefined，也就是说，这个方法不会忽略空位。

扩展运算符（...）也会将空位转为undefined。

for...of循环也会遍历空位。

