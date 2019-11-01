# babel

## @babel/preset-env

babel在对js进行转换的时候，从babel 7开始，一般采用`@babel/preset-env`来替换之前的指定不同的stage。`@babel/perset-env`能自动的依据`browserslist`指定的浏览器版本对js语法进行转换，而不需要向以前那样手动的引入相关的转化插件。(PS: 在配置好了browserslist后，可以敲命令`npm browserslist`来查看支持的浏览器列表)。如果没有指定browserslist,默认会转换成`ECMAScript 2015+`。

`@babel/perset-env`在转换的时候，如果把useBuiltIns设置为usage，那么babel会在转换的时候，自动把浏览器不兼容的语法，通过core-js给插入到生成的代码中。 如果是entry的话，需要在项目中预先引入core-js。默认情况下，usage选项只对标准的规范进行polyfill,可以设置为proposals改成对草案阶段的规范影响polyfill。

注意：对与fetch、classList、是没有polyfill的。Proxy也不支持

`@babel/runtime`在配合`babel-plugin-transform-runtime`的时候，也能达到按需转化es代码的效果。他和`@babel/perset-env`的不同点是？？？以前的用法，因为某一些方法不太好处理，就才有了后来的perset-env useBuiltInt:usage???
