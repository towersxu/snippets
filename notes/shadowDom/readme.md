# 影子DOM（Shadow DOM）

Shadow DOM 解决了构建网络应用的脆弱性问题。脆弱性是由 HTML、CSS 和 JS 的全局性引起的。 多年以来，我们发明了多个工具来规避这些问题。例如，使用新的 HTML id/类时，无法了解是否与页面所使用的现有名称冲突。微小错误渐渐增多，CSS 特异性成为一个大问题（!important 所有的事情！），样式选择器变得失控以及性能可能受损，不一而足。

Web components的一个重要特性是封装——可以将html标签结构、css样式和行为隐藏起来，并从页面上的其他代码中分离开来，这样不同的功能不会混在一起，代码看起来也会更加干净整洁。其中，Shadow DOM接口是关键所在，它可以将一个隐藏的、独立的DOM添加到一个元素上。

## Web Components

Web Components旨在解决这些问题 — 它由三项主要技术组成，它们可以一起使用来创建封装功能的定制元素，可以在你喜欢的任何地方重用，不必担心代码冲突。

- *Custom elements（自定义元素）*：一组JavaScript API，允许您定义custom elements及其行为，然后可以在您的用户界面中按照需要使用它们。

- *Shadow DOM（影子DOM）*：一组JavaScript API，用于将封装的“影子”DOM树附加到元素（与主文档DOM分开呈现）并控制其关联的功能。通过这种方式，您可以保持元素的功能私有，这样它们就可以被脚本化和样式化，而不用担心与文档的其他部分发生冲突。

- *HTML templates（HTML模板）*： `<template>` 和 `<slot>` 元素使您可以编写不在呈现页面中显示的标记模板。然后它们可以作为自定义元素结构的基础被多次重用。

- *HTML Imports*: 被废弃了~

## mode

```js
this.attachShadow({ mode: 'open'})
```

mode: open 表示你可以通过页面内的 JavaScript 方法来获取 Shadow DOM，例如使用Element.shadowRoot.

## 总结

shadow dom是web components的技术之一，写法是使用classx写法定义一个继承`HTMLElement`的对象，该对象可以在构造函数中使用`this.attachShadow({ mode: 'open'});`创建shadow Dom， 然后对这个DOM的操作都属于shadow dom内部的操作，这里面的DOM也不会受到外面样式的影响。在shadow Dom创建完成后，需要使用`customElements.define('shadow-user', User);`将这个DOM节点注册。这样html就可以直接使用html标签的形式使用它了。另外，外部js如果想要对shadow dom进行操作，必须mode设置为open, 然后js在获取这个shadow dom节点后，通过其shadowRoot属性获取到内部的DOM。

shadow dom在业界中的实践有腾讯开源的UI库omi。

## 自定义元素

shadow dom中使用的`customElements.define`就是自定义元素的API。处理constructor，还支持`connectedCallback`, `disconnectedCallback`, `adoptedCallback`, `attributeChangedCallback`方法用于在元素添加、删除、移动和修改属性的时候触发的方法。注意，修改的属性需要在static get observedAttributes中声明才会触发。

## 使用 templates and slots

html模板是指`<template></template>`报告的模板，该模板不会直接显示在页面上，但是可以通过js来操作，比如获取到模板然后复制到shadow dom里面。 slot是指在模板里面标签为slot的地方，可以在使用的时候用外部元素放入里面。和vue的slot一样。

## 参考资料

[Shadow DOM v1：独立的网络组件](https://developers.google.com/web/fundamentals/web-components/shadowdom)

[MDN Web Components](https://developer.mozilla.org/zh-CN/docs/Web/Web_Components)

[影子DOM（Shadow DOM）](https://developer.mozilla.org/zh-CN/docs/Web/Web_Components/%E5%BD%B1%E5%AD%90_DOM)
