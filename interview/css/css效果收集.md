# 收集日常阅读到的css效果相关内容

## 相关文章

记录网络上的相关文章

### [CSS 故障艺术](https://juejin.im/post/5e40bf55e51d4526d71d33ec)

文章内容关键点总结：

1. 如何实现抖音LOGO? 利用CSS混合模式`mix-blend-mode: lighten`, 可以将重叠部分表现为白色。
2. 对于背景图片的混合，则采用`background-blend-mode`。
3. 如何实现文字断裂效果？使用`clip-path`将文字分为多块。利用before、after的`content: attr(value string)`, attr的参数是html属性的值。

相关文章列表

1. [不可思议的颜色混合模式 mix-blend-mode](https://github.com/chokcoco/iCSS/issues/16)
2. [不可思议的混合模式 background-blend-mode](https://www.cnblogs.com/coco1s/p/8124815.html)

## 各效果的巧妙实现

### 如何实现图片的倒影功能

1. 使用新属性`-webkit-box-reflect`，IE不兼容，移动设备兼容。
2. 利用`inherit`, 在after中设置`background-image: inherit`。



