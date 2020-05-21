# 如何解决typescript引入vue文件IDE报错的问题

在.ts中引入.vue文件，IDE会报红，提示Cannot find module './H5LikeOrDislike'.ts(2307)

这个时候需要配置`vue-shims.d.ts`

```ts
declare module "*.vue" {
  import Vue from "vue";
  export default Vue;
}
```

配置了之后，可能还会提示vue文件没有export

还需要在ts-config.json中配置`"allowSyntheticDefaultImports": true,`

