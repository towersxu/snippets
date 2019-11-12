# CSS.supports

CSS.supports() 静态方法返回一个Boolean值，用来校验浏览器是否支持一个给定的CSS特性。

```js
result = CSS.supports('filter', 'blur(5px)'); // true
```

实际开发的时候，需要使用到对CSS检测场景，往往都是针对低版本的IE浏览器，例如IE9-IE11。

于是尴尬的事情出现了，低版本的IE浏览器并不支持浏览器原生支持的CSS.supports()方法，于是，我们的实际需求并没有因为这个新的API而得到解决，不得不求助于其他方法。

[JS检测CSS属性浏览器是否支持的多种方法](https://www.zhangxinxu.com/wordpress/2019/11/js-css-supports-detect/)
