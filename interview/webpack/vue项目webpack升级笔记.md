# vue项目webpack升级笔记

## webpack4.0新增的mode,分为development和production

通过mode, 你可以轻松设置打包环境。如果你将 `mode` 设置成 `development`，你将获得最好的开发阶段体验。这得益于webpack针对开发模式提供的特性：

- 浏览器调试工具
- 注释、开发阶段的详细错误日志和提示
- 快速和优化的增量构建机制

如果你将mode设置成了 production, webpack将会专注项目的部署，包括以下特性：

- 开启所有的优化代码
- 更小的bundle大小
- 去除掉只在开发阶段运行的代码
- Scope hoisting和Tree-shaking

## 什么是Scope hoisting

webpack 3.0新增的功能，又叫做“作用域提升”。目的是让打包出来的文件更小，运行更快。在webpack3.0中需要当做插件引入。在4.0后就是production模式默认带有的了。 参考地址[https://zhuanlan.zhihu.com/p/27980441](https://zhuanlan.zhihu.com/p/27980441)

```js
// webpack 3.0 config
module.exports = {
  plugins: [
    new webpack.optimize.ModuleConcatenationPlugin()
  ]
}
```

如何实现的呢?

其实是在打包的时候，以前把多个模块打包成多个function,而采用了scope hoisting后，则将所有模块的代码按照引用顺序放在一个函数作用域里，然后适当的重命名一些变量以防止变量名冲突。这样的话，文件体积小了，运行代码的时候，创建的函数作用域比以前少了，开销随之就小了。

## Tree-shaking

Tree-shaking是在build的时候去掉多余的代码，在webpack 4.0的时候，在`package.json`增加`sideEffects`。在4.39.1版本，mode: production的时候，就是没有配置sideEffects，项目中的代码也会触发tree-shaking（可能是文档还没有更新）。

## process.env.NODE_ENV不能再webpack的config中使用

DefinePlugin 在原始的源码中执行查找和替换操作，在导入的代码中，任何出现 process.env.NODE_ENV的地方都会被替换为"production"。

也就是说，webpack config文件中定义的变量：

```js
new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify('production')
})
```

是为了你将要打包的文件中用的。 那如何在webpack config文件中使用 process.env.NODE_ENV 呢？答案是corss-env

## shim 预置依赖

webpack compiler 能够识别遵循 ES2015 模块语法、CommonJS 或 AMD 规范编写的模块。然而，一些 third party(第三方库) 可能会引用一些全局依赖（例如 jQuery 中的 $）。因此这些 library 也可能会创建一些需要导出的全局变量。这些 "broken modules(不符合规范的模块)" 就是 shim(预置依赖) 发挥作用的地方。

shim 另外一个极其有用的使用场景就是：当你希望 polyfill 扩展浏览器能力，来支持到更多用户时。在这种情况下，你可能只是想要将这些 polyfills 提供给需要修补(patch)的浏览器（也就是实现按需加载）。

babel-preset-env package 通过 browserslist 来转译那些你浏览器中不支持的特性。这个 preset 使用 useBuiltIns 选项，默认值是 false，这种方式可以将全局 babel-polyfill 导入，改进为更细粒度的 import

## MiniCssExtractPlugin

MiniCssExtractPlugin是webpack4提供的把css从js中抽离成单独文件的插件。对于js中的backgroundImage路径问题，可以使用publicPath配置扩展路径来处理。

## html-webpack-plugin

html-webpack-plugin是创建一个html文件去引用webpack生成的文件。一般开发环境的index.html就是用的这个生成的。有参数template，可以指定对应的模板。

## copy-webpack-plugin

开发的时候，写在src外面的static，就是通过`copy-webpack-plugin`插件将其复制到build的结果目录里面去的。

## babel 7

从 Babel v7 开始，所有针对处于标准提案阶段的功能所编写的预设（stage preset）都已被弃用。也就是babel默认直接处理stage-0

@babel/preset-env， 动态的处理js语法问题，利用`useBuiltIns`可以根据不同的浏览器环境，按需引入polyfill。 `target`属性用来告诉babel所需要支持的浏览器。其写法同browserslist
