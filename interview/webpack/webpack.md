# webpack面试点

## 使用webpack如何做按需加载

在webpack1中使用的是`require.ensure()`

在webpack2之后，使用的是`import()`

## 对于webpack按需打包的文件如何自定义命名

可以通过内联注释来告诉运行时，该有怎样的行为。

```js
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
```
