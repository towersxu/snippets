# npm link加载本地项目报错

配置symlinks为false

```js
  configureWebpack: {
    resolve: {
      alias: {},
      symlinks: false // support npm link
    }
  }
```
