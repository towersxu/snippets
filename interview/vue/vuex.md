# vuex面试点

## vuex mutation为什么要同步的

如果mutation是异步的，那么当mutation触发的时候，回调函数还没有调用，devtools不知道什么时候回调函数实际上被调用
--实质上任何在回调函数中进行的状态的改变都是不可追踪的。

如果两个异步回调中调用mutation，是无法确认那个先调的。

## vuex namespaced有什么用

默认情况下，模块内部的 action、mutation 和 getter 是注册在全局命名空间的——这样使得多个模块能够对同一 mutation 或 action 作出响应。

如果希望你的模块具有更高的封装度和复用性，你可以通过添加 namespaced: true 的方式使其成为带命名空间的模块。当模块被注册后，它的所有 getter、action 及 mutation 都会自动根据模块注册的路径调整命名。

state默认就是模块类的状态嵌套了

在设置namespaced后，可以通过第三个rootState和第四个rootGetters获取全局属性。

## 在设置了namespaced后，如何实现注册action为全局

可以在action上点击属性root: true，然后将action的定义放到handler函数中

```js
actions: {
  root: true,
  handler (namespace, payload) {}
}
```

## createNamespacedHelpers有什么用

在vuex模块化的时候，如果模块比较复杂，在项目中调用action、state名字过长，可以通过这个方法来简化。

```js
import { createNamespacedHelpers } from 'vuex'

const { mapState, mapActions } = createNamespacedHelpers('some/nested/module')

export default {
  computed: {
    // 在 `some/nested/module` 中查找
    ...mapState({
      a: state => state.a,
      b: state => state.b
    })
  },
  methods: {
    // 在 `some/nested/module` 中查找
    ...mapActions([
      'foo',
      'bar'
    ])
  }
}
```

## vuex如何注册动态模块，有什么用

可以使用`store.registerModule`方法注册模块，动态模块注册功能其他Vue插件可以通过在store中附件新模块的方式来使用Vuex状态管理。例如`vuex-router-sync`插件就是通过动态注册模块将 vue-router 和 vuex 结合在一起，实现应用的路由状态管理。

store.unregisterModule(moduleName) 来动态卸载模块。

## 如果要一个模块创建多个实例，如何解决这个状态对象因为共享导致数据相互污染的问题

使用函数来声明模块

```js
const MyReusableModule = {
  state () {
    return {
      foo: 'bar'
    }
  },
  // mutation, action 和 getter 等等...
}
```

## vuex插件有什么用

在插件中不允许直接修改状态——类似于组件，只能通过提交 mutation 来触发变化。

用途：

1. 生成 State 快照
2. 内置 Logger 插件

## vuex严格模式有什么用

开启严格模式，仅需在创建 store 的时候传入 strict: true

在严格模式下，无论何时发生了状态变更且不是由 mutation 函数引起的，将会抛出错误。这能保证所有的状态变更都能被调试工具跟踪到。

不要在发布环境下启用严格模式！严格模式会深度监测状态树来检测不合规的状态变更——请确保在发布环境下关闭严格模式，以避免性能损失。

## vuex如何与表单的`v-model`结合起来

1. 可以把`v-model`拆开成`:value`和`@input`来使用
2. 使用双向绑定的计算属性，及使用带有setter的双向绑定计算

```html
<input v-model="message">
```

```js
computed: {
  message: {
    get () {
      return this.$store.state.obj.message
    },
    set (value) {
      this.$store.commit('updateMessage', value)
    }
  }
}
```
