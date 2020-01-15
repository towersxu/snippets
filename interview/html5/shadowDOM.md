# shadowDOM相关问题

## shadowDOM中如何使用css，如果使用了自定义属性，那么css的自定义属性应该在哪里声明

因为shadowDOM不受外部样式的影响，所以shadowDOM要求CSS要以style标签的形式插入shadowDOM内部的DOM中，这样才能生效。
在实际的开发中，我们可以把CSS在开发的时候单独写成一个style,在js代码中使用创建style标签，然后将style内容以文本的形式插入style标签即可。在打包的时候，采用`to-string-loader`将style转换成直接字符串的形式。

```js
let style = require('./keyboard.css?raw')
this.root = this.el.attachShadow({mode: 'open'})
let styleElement = document.createElement('style')
styleElement.textContent = style
this.root.appendChild(styleElement)
```

```js
// webpack
{
  test: /\.css/,
  oneOf: [{
    resourceQuery: /^\?raw$/,
    use: [
      require.resolve('to-string-loader'), // 注意，这里不能用style-loader
      require.resolve('css-loader'),
      require.resolve('postcss-loader')
    ]
  }, {
    //...
  }]
```

对应shadowDOM里面样式的变量问题，我们知道，一般情况下，样式的自定义属性可以声明在`:root`里面，然后在项目的运行过程中可以使用`document.documentElement.style.setProperty('--var', var)`动态修改。
如果是在shadowDOM中，我们其实可以把自定义属性声明在根元素的class里面，因为其实声明自定义属性只要在某个元素下，
元素后面的所有样式都使用这个自定义属性。这时，就可以通过自己修改这个元素的style属性来修改自定义属性了。
`this.el.style.setProperty('--var', var)`

还有一种方式，使用`:host-context`

```css
:host-context(music-keyboard) {
  --active: #FF9200;
  --bg: #111;
  --base: #fff;
  --switchBtn: #FF2300;
}
```

## 如何创建一个shadowDOM

分为两步

1. 创建一个类继承`HTMLElement`类
2. 给这个类定义一个名字，注册到customElements里面

```js
class Keyboard extends HTMLElement {
  constructor () {
    this.attachShadow({mode: 'open'})
  }
}
customElements.define('music-keyboard', Keyboard, { extends: 'p' })
```
