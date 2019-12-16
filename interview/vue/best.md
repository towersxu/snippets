# vue最佳实践

## 在组件销毁的时候使用$off注销事件监听

在使用了`$on`监听事件之后，需要在`destroyed`里面使用`$off`注销事件以防内存泄露。

## 事件名称始终使用下划线的写法

```js
// Emitting
this.$emit('my-event') // instead of myEvent
// Listening
v-on:my-event
```

## 不要在watch和created中调用同样的方法

需要需要处理的这种情况，可以使用immediate来实现这种需要。

```js
watch: {
  myProperty: {
    immediate: true, // forcing handler on initial status
    handler() {
      console.log('doing something...'); // No need to declare a function on methods for 1 use case
    }
  }
},
```

## 使用`$_`作为mixins属性

Mixins常用于将重复的代码写成一个单独的模块。由于组件内部的优先级是高于mixins的，当方法名重复的时候，可以使用的是组件内部的方法。使用`$_`更加只管的明白使用的是mixins中的方法，这样也防止了方法重复导致的覆盖问题。

Vue 使用 `_` 前缀来定义其自身的私有属性，所以使用相同的前缀 (比如 _update) 有覆写实例属性的风险。即便你检查确认 Vue 当前版本没有用到这个属性名，也不能保证和将来的版本没有冲突。

对于 $ 前缀来说，其在 Vue 生态系统中的目的是暴露给用户的一个特殊的实例属性，所以把它用于私有属性并不合适。

不过，我们推荐把这两个前缀结合为 $_，作为一个用户定义的私有属性的约定，以确保不会和 Vue 自身相冲突。

## props在js中采用驼峰，在HTML中采用下划线

不论什么框架，都建议在js中采用驼峰，在HTML中采用下划线

## 不要在for循环中使用v-if

改成computed

## action中始终return

## 组件名称为多个单词

组件名应该始终是多个单词的，根组件 App 以及 `<transition>`、`<component>` 之类的 Vue 内置组件除外。

```js

Vue.component('todo-item', {
  // ...
})

export default {
  name: 'TodoItem',
  // ...
}
```

## Prop 定义应该尽量详细

细致的 prop 定义有两个好处：

它们写明了组件的 API，所以很容易看懂组件的用法；
在开发环境下，如果向一个组件提供格式不正确的 prop，Vue 将会告警，以帮助你捕获潜在的错误来源。

## 为组件样式设置作用域

这条规则只和单文件组件有关。你不一定要使用 scoped 特性。设置作用域也可以通过 CSS Modules，那是一个基于 class 的类似 BEM 的策略，当然你也可以使用其它的库或约定。

```html
<template>
  <button :class="[$style.button, $style.buttonClose]">X</button>
</template>

<!-- 使用 CSS Modules -->
<style module>
.button {
  border: none;
  border-radius: 2px;
}

.buttonClose {
  background-color: red;
}
</style>
```

## 基础组件名

应用特定样式和约定的基础组件 (也就是展示类的、无逻辑的或无状态的组件) 应该全部以一个特定的前缀开头，比如 Base、App 或 V。

```txt
components/
|- BaseButton.vue
|- BaseTable.vue
|- BaseIcon.vue
```

## 单例组件名

只应该拥有单个活跃实例的组件应该以 The 前缀命名，以示其唯一性。

这不意味着组件只可用于一个单页面，而是每个页面只使用一次。这些组件永远不接受任何 prop，因为它们是为你的应用定制的，而不是它们在你的应用中的上下文。如果你发现有必要添加 prop，那就表明这实际上是一个可复用的组件，只是目前在每个页面里只使用一次。

```txt
components/
|- TheHeading.vue
|- TheSidebar.vue
```

## 和父组件紧密耦合的子组件应该以父组件名作为前缀命名

如果一个组件只在某个父组件的场景下有意义，这层关系应该体现在其名字上。因为编辑器通常会按字母顺序组织文件，所以这样做可以把相关联的文件排在一起。

```txt
components/
|- SearchSidebar.vue
|- SearchSidebarNavigation.vue
```

## 组件名应该以高级别的 (通常是一般化描述的) 单词开头，以描述性的修饰词结尾

如果文件数量不多，不建议新建子目录来存放子组件。

在多级目录间找来找去，要比在单个 components 目录下滚动查找要花费更多的精力。

存在组件重名 (比如存在多个 ButtonDelete 组件) 的时候在编辑器里更难快速定位。

让重构变得更难，因为为一个移动了的组件更新相关引用时，查找/替换通常并不高效。

```txt
components/
|- BannerPanel.vue
|- BannerButtonAdd.vue
|- BannerImage.vue
|- SearchButtonClear.vue
|- SearchButtonRun.vue
|- SearchInputQuery.vue
|- SearchInputExcludeGlob.vue
|- SettingsCheckboxTerms.vue
|- SettingsCheckboxLaunchOnStartup.vue
```

## 在单文件组件、字符串模板和 JSX 中没有内容的组件应该是自闭合的——但在 DOM 模板里永远不要这样做。

自闭合组件表示它们不仅没有内容，而且刻意没有内容。其不同之处就好像书上的一页白纸对比贴有“本页有意留白”标签的白纸。而且没有了额外的闭合标签，你的代码也更简洁。

```html
<!-- 在单文件组件、字符串模板和 JSX 中 -->
<MyComponent/>
<!-- 在 DOM 模板中 -->
<my-component></my-component>
```

## JS/JSX 中的组件名大小写

JS/JSX 中的组件名应该始终是 PascalCase 的，尽管在较为简单的应用中只使用 Vue.component 进行全局组件注册时，可以使用 kebab-case 字符串。

## 完整单词的组件名

编辑器中的自动补全已经让书写长命名的代价非常之低了，而其带来的明确性却是非常宝贵的。不常用的缩写尤其应该避免。

## Prop 名大小写

在声明 prop 的时候，其命名应该始终使用 camelCase，而在模板和 JSX 中应该始终使用 kebab-case。

## 多个特性的元素应该分多行撰写，每个特性一行

在 JavaScript 中，用多行分隔对象的多个属性是很常见的最佳实践，因为这样更易读。模板和 JSX 值得我们做相同的考虑。

```html
<MyComponent
  foo="a"
  bar="b"
  baz="c"
/>
```

## 模板中简单的表达式

组件模板应该只包含简单的表达式，复杂的表达式则应该重构为计算属性或方法。

## 应该把复杂计算属性分割为尽可能多的更简单的属性。

*易于测试*：当每个计算属性都包含一个非常简单且很少依赖的表达式时，撰写测试以确保其正确工作就会更加容易。

*易于阅读*：简化计算属性要求你为每一个值都起一个描述性的名称，即便它不可复用。这使得其他开发者 (以及未来的你) 更容易专注在他们关心的代码上并搞清楚发生了什么。

*更好的“拥抱变化”*: 任何能够命名的值都可能用在视图上。举个例子，我们可能打算展示一个信息，告诉用户他们存了多少钱；也可能打算计算税费，但是可能会分开展现，而不是作为总价的一部分。

小的、专注的计算属性减少了信息使用时的假设性限制，所以需求变更时也用不着那么多重构了。

## 非空 HTML 特性值应该始终带引号 (单引号或双引号，选你 JS 里不用的那个)

在 HTML 中不带空格的特性值是可以没有引号的，但这鼓励了大家在特征值里不写空格，导致可读性变差。

```html
<AppSidebar :style="{ width: sidebarWidth + 'px' }">
```
