# 什么是AMP

Accelerated Mobile Pages (AMP)直译过来就是在移动设备上快速加载的网页。它是由 Google 发起的一个开源项目,主要目的是缩短静态内容的渲染时间从而有效提升网站的加载速度。

- DTD 必须是： `<!doctype html>`；

- 顶层标签必须包含 AMP 属性如： `<html amp>`，方便其他程序识别 AMP HTML；

- 必须在 HEAD 区域中放置 `<link rel="canonical" href="$SOME_URL" />` 标签，指定该页面普通版本的 URL；如果只有一个版本，则使用当前 URL；

- 必须将`<meta charset="utf-8">` 放置在 HEAD 区域最开始的位置；

- 必须在 HEAD 区域包含这个 ViewPort：`<meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no,minimal-ui">`

- 必须将 <script async src="https://cdn.ampproject.org/v0.js"></script> 作为 HEAD区域最后的元素；

- 必须在 HEAD 区域包含上面示例所示的`<style amp-boilerplate>` 和 `<noscript>`的相关代码；

AMP HTML 自定义5个组件： amp-ad、amp-embed、amp-img、amp-pixel、amp-video

AMP HTML的一个重要特性就是可扩展性，它提供扩展组件来实现丰富的功能。

```html
<script async custom-element="app-twitter" src="https://xx.com/amp-twitter-0.1.js">
<amp-twitter width=390 height=50 layout="responsive" data-tweetid="xxxx">
```

## AMP如何提升性能

1.只允许异步加载script
2.静态资源指定宽高
3.避免扩展机制影响渲染
4.关键路径禁用第三方JS
5.CSS必须内联，内联样式表最大50kb
6.字体必须有效触发
7.减小样式重计算
8.只运行经GPU加速的动画
9.优化资源加载次序
10.使用 preconnect API

## 参考资料

[网页加速特技之 AMP](https://www.cnblogs.com/qcloud1001/p/7839269.html)
