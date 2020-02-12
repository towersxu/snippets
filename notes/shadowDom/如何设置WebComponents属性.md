# 如何设置Web Components的属性

在使用Web Components创建一个组件的时候，例如MyTitle组件。将title的名字采用属性的方式写上去。

```html
<my-title title="百度一下"></my-title>
```

如果需要在某个时候把title改变。那么该如何监听这个改变，并将其在ShadowDom里面更新呢？

这里可以采用`MutationObserver`,在Web Components组件初始化的时候，
this表示的就是这个自定义元素DOM。如果使用MutationObserver监听这个属性变化，
则可以将更新的内容同步更新到里面来。

参考代码如下

```ts
import ShadowElements from '../../ShadowElements'
let header = require('./header.css?raw')
class XxHeader extends ShadowElements {
  titleEl: HTMLSpanElement
  constructor() {
    super('div')
    this.titleEl = document.createElement('span')
    this.addClass('header')
    this.append(this.titleEl)
    this.update()
    this.addStyleRule(header)
    let observer = new MutationObserver(this.change.bind(this))
    observer.observe(this, {
      attributes: true, childList: true, subtree: true
    })
  }
  update () {
    this.updateTitle()
  }
  updateTitle () {
    let title = this.getAttribute('title')
    this.titleEl.innerText = title
    this.addStyle({
      hight: '50px'
    })
  }
  change () {
    this.update()
  }
}

customElements.define('xx-header', XxHeader);
```