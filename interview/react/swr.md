# SWR

SWR是next.js团队编写的远程获取数据的react hooks库

[精读《Hooks 取数 - swr 源码》](https://zhuanlan.zhihu.com/p/91228591)

特点：在UI生命周期中取数，比fetch好用。

和数据流中取数的区别？

数据流中做到获取数据统一管理，而swr是在每个组件的生命周期里面取数，都可以有数据缓存.个人感觉在大型项目中还是使用redux来进行数据流获取更方便。swr适合在组件或者服务端渲染使用？
