# CSS模块化方案分类

最初css模块化是指@import

## 命名约定

BEM(Block__Element--Modifier)

```css
.home {
  margin: 0 auto;
}
.home__title {
  font-size: 24px;
}
.home__title--selected {
  color: blue;
}
```

ELEMENT

```css
.el-checkbox{}
.el-checkbox__input{}
.el-checkbox__input.is-checked{}
```

## CSS in JS

styled-components

```js
import React from 'react';

import styled from 'styled-components';

const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
`;
```

[css-in-js](https://github.com/MicheleBertoli/css-in-js), react的css in js各种方案的对比。

## CSS Modules

CSS Modules不是将CSS改造的具有编程能力，而是加入了局部作用域、依赖管理，这恰恰解决了最大的痛点。可以有效避免全局污染和样式冲突，能最大化地结合现有 CSS 生态和 JS 模块化能力。

css modules + classnames可以在react中根据不同的状态，渲染不同的样式

```js
const c = require('classnames')
import excelStyle from './excel.less'

<span className={
  c({
    [excelStyle['cell-tool']]: config.isTool,
    [iconfont['iconfont']]: true,
    [iconfont[config.icon]]: true
  })
} title={config.text} onClick={this.handleClick.bind(this, config.type)}>{config.text}</span>

```

webpack配置

```js
module: {
  rules: [
    ...
    {
      test: /\.css/,
      oneOf: [{
        // 如果是引入的时候带有raw，那么可以不使用css module。 import "dialog.css?raw"
        resourceQuery: /^\?raw$/,
        use: [
          require.resolve('style-loader'),
          require.resolve('css-loader')
        ]
      }, {
        use: [{
          loader: 'style-loader'
        }, {
          loader: 'css-loader',
          options: {
            modules: true,
            importLoaders: 1,
            localIdentName: '[local]_[sha1:hash:hex:4]'
          }
        }]
      }]
    }
  ]
}
```

Q： 项目中如何解决CSS样式冲突的问题？特别是开发公共插件的时候，如何保证插件的样式不被业务覆盖？

就目前要兼容IE9的情况下，是没有完美的方案的。目前主要的方案有：

1、命名约定，BEM之类的
2、css in js js动态向Dom插入style比如styled-jsx、style-components
3、css-module 将class随机命名成hash字符串
4、vue scoped 基于属性选择进行限制

目前提供的方案最好的方案是shadow dom
