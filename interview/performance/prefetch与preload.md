# prefetch、preload、dns-prefetch、defer、async

## prefetch

浏览器会在空闲的时候,下载指定文件，并缓存到disk。当有页面使用的时候，直接从disk缓存中读取。其实就是把决定是否和什么时间加载这个资源的决定权交给浏览器。

```html
<link href="main.js" rel="prefetch">
```

注意：如果prefetch还没下载完之前，浏览器发现script标签也引用了同样的资源，浏览器会再次发起请求，这样会严重影响性能的，加载了两次，所以不要在当前页面马上就要用的资源上用prefetch。如果当前页面要用的，可以使用`preload`

## preload

浏览器会在遇到如下link标签时，立刻开始下载main.js(不阻塞parser)，并放在内存中，但不会执行其中的JS语句。

只有当遇到script标签加载的也是main.js的时候，浏览器才会直接将预先加载的JS执行掉。

```html
<link rel="preload" href="/main.js" as="script">
```

preload相比于直接用script引入的优势是不会阻塞parser。

## defer

defer的执行时间是在所有元素解析完成之后，DOMContentLoaded 事件触发之前。

一般情况下，如果js中如果没有对DOM树进行修改的时候，可以使用defer, 其效果等同于将`<script>`
放到`</body>`的前面。

```html
<script src="main.js" defer></script>
<script src="main1.js" defer></script>
```

多个使用defer属性的script,是有执行的先后顺序的.

## async

async的执行时间是在当前JS脚本下载完成后，所以多个async script是执行顺序是不固定的。async只能用于加载一些独立无依赖的代码，比如Google Analysis之类。

## dns-prefetch

DNS解析速度是造成页面延迟加载,对应一个网站，如果会涉及到多个域名，可以将其他域名在html中使用`dns-prefetch`对这些域名的DNS解析进行加速。

DNS Prefetch 应该尽量的放在网页的前面，推荐放在 <meta charset="UTF-8"> 后面

```html
<link rel="dns-prefetch" href="//www.zhix.net">
<link rel="dns-prefetch" href="//api.share.zhix.net">
```
