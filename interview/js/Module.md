# AMD、CMD、CommonJS和UMD

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

## ES6 module



