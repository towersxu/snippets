## package.json 中的 'workspace'

yarn为了方便monorepo的管理，支持在package.json中配置字段workspace,这样在项目中就可以使用`import 子项目`

改功能是`npm link`的monorepo解决方法。

monorepo管理存在的一个共同难题是依赖的管理。如果为每个repo都独立安装依赖，当多个repo之间有共同的依赖时会造成重复安装，既占用空间又影响速度。yarn的workspaces功能就是为了解决这个问题。开启后，yarn会统一分析多个repo的依赖，如果有共同的依赖(同一个库，版本需求一致)，那么就会把依赖从该repo的node_modules提升到外部的node_modules中。这样避免重复安装。

注意：只有在private: true中可以使用此特性。

```json
  "workspaces": [
    "packages/*"
  ],
```

[package.json 中的 'workspace'](https://github.com/ginobilee/notes/wiki/package.json-%E4%B8%AD%E7%9A%84-'workspace')