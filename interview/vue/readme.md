# Vue相关的面试题

## vue自定义指令的用途

在需要对DOM底层进行操作的时候。

## vue的指令有那些钩子函数

- `bind`: 只调用一次，指令第一次绑定到元素时调用。在这里可以进行一次性的初始化设置。
- `inserted`: 被绑定元素插入父节点时调用 (仅保证父节点存在，但不一定已被插入文档中)。
- `update`: 所在组件的 VNode 更新时调用，但是可能发生在其子 VNode 更新之前。指令的值可能发生了改变，也可能没有。但是你可以通过比较更新前后的值来忽略不必要的模板更新
- `componentUpdated`：指令所在组件的 VNode 及其子 VNode 全部更新后调用。
- `unbind`：只调用一次，指令与元素解绑时调用。

## vue的动态指令参数是什么

指令的参数可以是动态的。例如，在 v-mydirective:[argument]="value" 中，argument 参数可以根据组件实例数据进行更新！

这使得自定义指令可以在应用中被灵活使用。

## vue常见的事件修饰符有哪些

`stop`、`prevent`、`self`、`enter`、`.[number]`、`.ctrl`、`.shift`

## vue的函数式组件有什么用

```js
Vue.component('my-functional-button', {
  functional: true
})
```

Vue 提供了一种称为函数式组件的组件类型，用来定义那些没有响应数据，也不需要有任何生命周期的场景，它只接受一些props 来显示组件。

正是因为函数式组件精简了很多例如响应式和钩子函数的处理，因此渲染性能会有一定的提高，所以如果你的业务组件是一个纯展示且不需要有响应式数据状态的处理的，那函数式组件会是一个非常好的选择。

## vue的插件有什么用

插件通常用来为 Vue 添加全局功能。插件的功能范围没有严格的限制——一般有下面几种：

- 添加全局方法或者属性
- 添加全局资源：指令/过滤器/过渡等
- 通过全局混入来添加一些组件选项
- 添加 Vue 实例方法，通过把它们添加到 Vue.prototype 上实现。

```js
MyPlugin.install = function (Vue, options) {}
Vue.use(MyPlugin)
```

## vue的过滤器和指令使用情况有什么区别

过滤器一般是对文本进行修改的操作，常见用于文本格式化。

可以使用括号传递参数

```js
{{ message | filterA('arg1', arg2) }}
```

## vue的状态过渡是什么

Vue 的过渡系统提供了非常多简单的方法设置进入、离开和列表的动效。

但是对于一些其它的数值本身不断变化的动画，可以结合Vue的响应式系统和组件系统，使用第三方库来实现切换元素的过渡状态。

比如实现一个自动增加值的带有“补间动画”的数字组件

```js
// 这种复杂的补间动画逻辑可以被复用
// 任何整数都可以执行动画
// 组件化使我们的界面十分清晰
// 可以支持更多更复杂的动态过渡
// 策略。
Vue.component('animated-integer', {
  template: '<span>{{ tweeningValue }}</span>',
  props: {
    value: {
      type: Number,
      required: true
    }
  },
  data: function () {
    return {
      tweeningValue: 0
    }
  },
  watch: {
    value: function (newValue, oldValue) {
      this.tween(oldValue, newValue)
    }
  },
  mounted: function () {
    this.tween(0, this.value)
  },
  methods: {
    tween: function (startValue, endValue) {
      var vm = this
      function animate () {
        if (TWEEN.update()) {
          requestAnimationFrame(animate)
        }
      }

      new TWEEN.Tween({ tweeningValue: startValue })
        .to({ tweeningValue: endValue }, 500)
        .onUpdate(function () {
          vm.tweeningValue = this.tweeningValue.toFixed(0)
        })
        .start()

      animate()
    }
  }
})
```

## vue如何支持组件循环递归引用的

组件是可以在它们自己的模板中调用自身的。不过它们只能通过 name 选项来做这件事

使用webpack的异步import()，能解决多组件循环引用。
