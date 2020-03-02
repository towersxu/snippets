# css冷门知识点

## before、after的content可以取值有哪些

```css
content: normal                                /* Keywords that cannot be combined with other values */
content: none

content: 'prefix'                              /* <string> value, non-latin characters must be encoded e.g. \00A0 for &nbsp; */
content: url(http://www.example.com/test.html) /* <uri> value */
content: chapter_counter                       /* <counter> values */
content: attr(value string)                    /* attr() value linked to the HTML attribute value */
content: open-quote                            /* 引号 */
content: close-quote
content: no-open-quote
content: no-close-quote

content: open-quote chapter_counter            /* Except for normal and none, several values can be used simultaneously */

content: inherit
```

## css 7阶层叠水平

[W3](https://www.w3.org/TR/CSS2/visuren.html#propdef-z-index)

对于没有生成`堆叠上下文(stacking context)`的两个元素，位置是受到`层叠水平(stacking level)`的影响

1. 形成层叠上下文环境的背景及边框
2. z-index为负的元素
3. 正常定位的非inline-block和无postion定位子元素
4. 无postion定制的float元素
5. 正常定位的inline-block元素和inline-table
6. z-index:0
7. z-index为正

另外，如果两个元素都生成了`堆叠上下文`，那么只和元素在HTML中的位置（后放的在前面）以及z-index有关系。

子元素的 z-index 值只在父级层叠上下文中有意义。意思就是父元素的 z-index 低于父元素另一个同级元素，子元素 z-index 再高也没用。

## 如何实现最多两行超过用省略号结尾

1. 使用-webkit-line-clamp属性，主要，IE edge也是使用的webkit前缀。

```css
display: -webkit-box; // 设置display，将对象作为弹性伸缩盒子模型显示
-webkit-line-clamp: 2; // 限制在一个块元素显示的文本的行数
-webkit-box-orient: vertical; // 规定框的子元素应该被水平或垂直排列
```

2. 在实际项目中，因为有兼容性需求，还是使用的filter截断处理的。

## conic-gradient

- linear-gradient : 线性渐变
- radial-gradient : 径向渐变
- conic-gradient　: 角向渐变

### 使用 conic-gradient 实现颜色表盘和仪表盘

[神奇的 conic-gradient 角向渐变](https://github.com/chokcoco/iCSS/issues/19)


