# postcss

postcss 一种对css编译的工具，类似babel对js的处理

功能：

1. 使用下一代css语法， css-next

- image-set(): 指定不同retina屏幕显示不同的背景图。

```css
.foo {
  background-image: image-set(
    url(img/test.png) 1x,
    url(img/test-2x.png) 2x,
    url(my-img-print.png) 600dpi
  );
}
```

- :not, 支持多个选择器,css3中的not只支持一个

```css
p:not(:first-child, .special) {
  color: red;
}
```

- var,  css在:root中声明变量的值

```css
:root {
  --mainColor: red;
}

a {
  color: var(--mainColor);
}
```

- @apply， 复用在:root中声明的一组css属性

```css
:root {
  --danger-theme: {
    color: white;
    background-color: red;
  }
}

.danger {
  @apply --danger-theme;
}
```

2.自动补全浏览器前缀

 autoprefixer

3.自动把px代为转换成rem等插件
