# vue router面试点

## `this.$route`和`this.$router`有什么区别

`this.$router`是整个router对象，里面有路由的history、push、replace等方法，我们可以在任何组件内通过 this.$router 访问路由器。

`this.$route`是表示的当前路由信息，比如常见的获取params、name、meta等。

## 对于动态路由，如何处理路由参数变化因为组件复用导致一些钩子函数不会再被调用的问题

1. 可以watch `$route`对象。
2. 也可以在`beforeRouteUpdate`中做出相应。

## 对于使用通配符`*`匹配的路由，如何获取具体匹配到url是什么，比如`/user-axxx`被`/user-*`匹配，怎么获取*对应的是`axxx`

当使用通配符的时，`$route.params`内会自动添加一个名为`pathMatch`参数。它包含了URL通过通配符被匹配的部分

## 同一个URL可以被多个路由匹配的时候，如何分配

按照定义的顺序，谁先定义，谁的优先级高

## `router.push`的时候使用name和path有什么区别

在使用path的时候，会忽略params。

```js
const userId = '123'
router.push({ name: 'user', params: { userId }}) // -> /user/123
router.push({ path: `/user/${userId}` }) // -> /user/123
// 这里的 params 不生效
router.push({ path: '/user', params: { userId }}) // -> /user
```

## `router.push`如何知道路由跳转失败，进入路由的时候被拒绝了

`router.push`和`router.replace`都提供了onComplete和onAbort回调作为第二个和第三个参数。这些回调将会在导航成功完成或者终止的时候进行调用。3.1.0+支持promise

## 命名视图有什么用，如何使用

如果希望多个视图同时展示，可以使用命名视图。在router.js配置的时候，不在使用component，而是使用components

```js
[
  {
    path: '/',
    components: {
      default: Foo,
      a: Bar,
      b: Baz
    }
  }
]
```

## 如何实现url地址为/b，但是实际访问的是/a的内容

使用别名（alias），别名和重定向的区别是：

重定向：当用户访问 /b时，URL 将会被替换成 /a，然后匹配路由为 /a

```js
{ path: '/b', redirect: '/a' }
```

别名： /a 的别名是 /b，意味着，当用户访问 /b 时，URL 会保持为 /b，但是路由匹配则为 /a，就像用户访问 /a 一样。

```js
{ path: '/a', component: A, alias: '/b' }
```

“别名”的功能让你可以自由地将 UI 结构映射到任意的 URL，而不是受限于配置的嵌套路由结构。

## 如何解决组件中使用`$route`导致组件与对应路由形成高度耦合，从而组件只能在特点URL上使用的问题

使用props将组件和路由解耦

```js
{
  path: 'blog/:id',
  component: () => import(/* webpackChunkName: "blogDetail" */ '../views/user/blogDetail.vue'),
  props: (route: any) => ({
    id: route.params.id
  })
}
```

## `router.beforeEach`和`router.beforeResolve`的区别

`router.beforeEach`在调用next之前，目标路由组件的js不会被下载

`router.beforeResolve`在调用之前，目前路由组件的js就被下载了，而且会执行组件的beforeRouteEnter, 但是不会执行组件自身的钩子，比如beforeCreate

## `beforeRouteEnter`中怎么修改组件属性

`beforeRouteEnter`不能访问this,但是可以在next中访问组件实例

```js
beforeRouteEnter (to, from, next) {
  next(vm => {
    // 通过 `vm` 访问组件实例
  })
}
```

## vue router导航解析流程

1. 导航被触发。
2. 在失活的组件里调用离开守卫。
3. 调用全局的 beforeEach 守卫。
4. 在重用的组件里调用 beforeRouteUpdate 守卫 (2.2+)。
5. 在路由配置里调用 beforeEnter。
6. 解析异步路由组件。
7. 在被激活的组件里调用 beforeRouteEnter。
8. 调用全局的 beforeResolve 守卫 (2.5+)。
9. 导航被确认。
10. 调用全局的 afterEach 钩子。
11. 触发 DOM 更新。
12. 用创建好的实例调用 beforeRouteEnter 守卫中传给 next 的回调函数。

## 如何实现当切换到新路由时，想要页面滚到顶部，或者是保持原先的滚动位置，就像重新加载页面那样

可以在router上设置属性`scrollBehavior`， 如果返回一个 falsy，或者是一个空对象，那么不会发生滚动。

```js
scrollBehavior (to, from, savedPosition) {
  if (savedPosition) {
    return savedPosition
  } else {
    return { x: 0, y: 0 }
  }
}
```

你也可以返回一个 Promise 来得出预期的位置描述

```js
scrollBehavior (to, from, savedPosition) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ x: 0, y: 0 })
    }, 500)
  })
}
```
