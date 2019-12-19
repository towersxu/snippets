# CSP

CSP指的是内容安全策略，为了缓解很大一部分潜在的跨站脚本问题，浏览器的扩展程序系统引入了内容安全策略（CSP）的一般概念。这将引入一些相当严格的策略，会使扩展程序在默认情况下更加安全，开发者可以创建并强制应用一些规则，管理网站允许加载的内容。

## 合理使用 CSP

CSP，全称是 Content Security Policy，它有非常多的指令，用来实现各种各样与页面内容安全相关的功能。

*block-all-mixed-content*对于 HTTPS 中的图片等 Optionally-blockable 类 HTTP 资源，现代浏览器默认会加载。图片类资源被劫持，通常不会有太大的问题，但也有一些风险，例如很多网页按钮是用图片实现的，中间人把这些图片改掉，也会干扰用户使用。通过 CSP 的 block-all-mixed-content 指令，可以让页面进入对混合内容的严格检测(Strict Mixed Content Checking)模式。在这种模式下，所有非 HTTPS 资源都不允许加载。

通过HTTP响应头方法设置

```txt
Content-Security-Policy: block-all-mixed-content
```

`<meta>`标签方式

```html
<meta http-equiv='Content-Security-Policy' content='block-all-mixed-content'>  
```

*upgrade-insecure-requests*历史悠久的大站在往 HTTPS 迁移的过程中，工作量往往非常巨大，尤其是将所有资源都替换为 HTTPS 这一步，很容易产生疏漏。即使所有代码都确认没有问题，很可能某些从数据库读取的字段中还存在 HTTP 链接。

而通过 upgrade-insecure-requests 这个 CSP 指令，可以让浏览器帮忙做这个转换。启用这个策略后，有两个变化：

- 页面所有 HTTP 资源，会被替换为 HTTPS 地址再发起请求;
- 页面所有站内链接，点击后会被替换为 HTTPS 地址再跳转;

[http转https后资源加载不显示](https://blog.csdn.net/weixin_36065510/article/details/56673866)
