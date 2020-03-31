# typescript和react常见问题收集

## 如何处理tsx IDE报错的问题

1、新建.d.ts文件

```ts
declare namespace JSX {
  interface Element { }
  interface IntrinsicElements { div: any; }
}
```

2、引入对应的@type文件
