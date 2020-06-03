# package.json相关内容

package.json中的module属性，用于打包工具识别，来进行tree-shaking.

[https://loveky.github.io/2018/02/26/tree-shaking-and-pkg.module/](https://loveky.github.io/2018/02/26/tree-shaking-and-pkg.module/)

在nodejs中，当`.js`文件最近的package.json的`type`被设置为`module`的时候，该文件会被当做`ES modules`加载。
[https://nodejs.org/api/esm.html](https://nodejs.org/api/esm.html)

[package.json 中 你还不清楚的 browser，module，main 字段优先级](https://github.com/SunshowerC/blog/issues/8)

由于我们使用的模块规范有 ESM 和 commonJS 两种，为了能在 node 环境下原生执行 ESM 规范的脚本文件，.mjs 文件就应运而生。

当存在 index.mjs 和 index.js 这种同名不同后缀的文件时，import './index' 或者 require('./index') 是会优先加载 index.mjs 文件的。

也就是说，优先级 mjs > js