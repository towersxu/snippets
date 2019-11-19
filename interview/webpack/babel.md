# babel

## @babel/preset-env

babel在对js进行转换的时候，从babel 7开始，一般采用`@babel/preset-env`来替换之前的指定不同的stage。`@babel/perset-env`能自动的依据`browserslist`指定的浏览器版本对js语法进行转换，而不需要向以前那样手动的引入相关的转化插件。(PS: 在配置好了browserslist后，可以敲命令`npm browserslist`来查看支持的浏览器列表)。如果没有指定browserslist,默认会转换成`ECMAScript 2015+`。

`@babel/perset-env`在转换的时候，如果把useBuiltIns设置为usage，那么babel会在转换的时候，自动把浏览器不兼容的语法，通过core-js给插入到生成的代码中。 如果是entry的话，需要在项目中预先引入core-js。默认情况下，usage选项只对标准的规范进行polyfill,可以设置为proposals改成对草案阶段的规范影响polyfill。

注意：对与fetch、classList、是没有polyfill的。Proxy也不支持

`@babel/runtime`在配合`babel-plugin-transform-runtime`的时候，也能达到按需转化es代码的效果。他和`@babel/perset-env`的不同点是？？？以前的用法，因为某一些方法不太好处理，就才有了后来的perset-env useBuiltInt:usage???

## webpack是如何把我们编写的代码（typescript、vue、react等）转换成es5代码

1. webpack是通过loader来对我们编写的代码进行处理的，一般情况下，对于typescript、vue、react等文件的处理，我们需要引入对应的`loader`（vue-loader、）来将里面的js相关部分抽离出来。然后使用`babel-loader`将js转换成es5。
2. babel处理流程主要分为3个部分（解析、转换、生成）
  
     - `解析`主要使用`Babylon`,将JavaScript字符串转换为抽象语法树。解析分为*词法分析*和*语法分析*两个阶段，词法分析就是根据最小有效单元，对字符串进行切割。语法分析就是把切割的字符串生成一个抽象语法树（js对象）
     - `转换`是使用`babel-traverse`浏览、分析和修改抽象语法树.
     - `生成`是使用`babel-generator`模块用来将转换后的抽象语法树（AST Abstract Syntax Tree）转化为Javascript 字符串.
