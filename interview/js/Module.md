# JS模块相关

## CommonJS

Nodejs的模块规范、一个单独文件就是一个模块.使用require加载模块，导出使用exports.

CommonJS是同步的，所以只有加载完成后才能执行后面的操作。

## AMD

`define(id?, dependencies?, factory)`

除了define外，AMD还保留一个关键字require。require 作为规范保留的全局标识符，可以实现为 module loader，也可以不实现。

RequireJS 是一个前端的模块化管理的工具库，遵循AMD规范。

```js
define(['module', 'module2'], function (m1, m2) {})

require(['module', 'module'], function () {})
```

## CMD

CMD是SeaJS 在推广过程中对模块定义的规范化产出

## UMD

UMD是AMD和CommonJS的糅合

## ES6 import命令如何对导入的变量进行重命名

```js
import a as x from 'xx'
```

## import命令和import()函数的区别

由于import命令是静态执行，所以不能使用表达式和变量，这些只有在运行时才能得到结果的语法结构。

```js
// 报错
import { 'f' + 'oo' } from 'my_module';
// 报错
let module = 'my_module';
import { foo } from module;
// 报错
if (x === 1) {
  import { foo } from 'module1';
} else {
  import { foo } from 'module2';
}
```

`import()`函数是动态加载的,可以用在任何地方，不仅仅是模块，非模块的脚本也可以使用。

import()函数与所加载的模块没有静态连接关系，这点也是与import语句不相同。

```js
button.addEventListener('click', event => {
  import('./dialogBox.js')
  .then(dialogBox => {
    dialogBox.open();
  })
  .catch(error => {
    /* Error handling */
  })
});
```

## 可以直接写`export 42`吗

不行，可以写`export default 42;`

报错是因为没有指定对外的接口，而`export default 42`指定对外接口为default。

## 如何实现跨模块声明常量

const声明的常量只在当前代码块有效。如果想设置跨模块的常量（即跨多个文件），或者说一个值要被多个模块共享,
可以创建一个文件constants，在这个文件中导出

## ES6 module与CommonJS的差别

CommonJS 模块输出的是一个值的拷贝，ES6 模块输出的是值的引用。

CommonJS 模块输出的是值的拷贝，也就是说，一旦输出一个值，模块内部的变化就影响不到这个值。

ES6 模块的运行机制与 CommonJS 不一样。JS 引擎对脚本静态分析的时候，遇到模块加载命令import，就会生成一个只读引用。等到脚本真正执行时，再根据这个只读引用，到被加载的那个模块里面去取值。

ES6 模块不会缓存运行结果，而是动态地去被加载的模块取值，并且变量总是绑定其所在的模块。

CommonJS 模块是运行时加载，ES6 模块是编译时输出接口。

Node 对 ES6 模块的处理比较麻烦，因为它有自己的 CommonJS 模块格式，与 ES6 模块格式是不兼容的。目前的解决方案是，将两者分开，ES6 模块和 CommonJS 采用各自的加载方案。

Node 要求 ES6 模块采用.mjs后缀文件名。或者在package.json里面声明`type="module"`，还有在执行的时候设置`--input-type=module`

动态import()支持CommonJS和ES modules.

## ES6和CommonJS是如何解决循环加载的问题

CommonJS是模块加载了后直接在内存中生成一个对象记录这个模块，下次在加载的时候直接去获取的。
也就是说，CommonJS 模块无论加载多少次，都只会在第一次加载时运行一次，以后再加载，就返回第一次运行的结果，除非手动清除系统缓存。

CommonJS的做法是，一旦出现某个模块被"循环加载"，就只输出已经执行的部分，还未执行的部分不会输出。
也就是说假设a.js引入b.js，b.js再引入a.js,b执行的时候加载a，因为a还没有执行完，所以b加载的a只会加载已执行的部分。
这样就避免的循环加载。

所以，输入变量的时候，必须非常小心。

```js
var a = require('a'); // 安全的写法
var foo = require('a').foo; // 危险的写法， 可能foo这个时候还没有值。
```

ES6处理循环加载和CommonJS有不一样的地方，ES6不是加载已执行部分，而是默认为这个模块以及加载好了，就不会再去加载了。
