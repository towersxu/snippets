# 如何分析 Node.js 中的内存泄漏

[如何分析 Node.js 中的内存泄漏](https://zhuanlan.zhihu.com/p/25736931)

闭包不会直接导致内存泄露，闭包和内存泄露相关一般是闭包里面有意外的生成绑定到全局对象，然后闭包重复执行。

闭包只有使用不当才会导致内存泄露

闭包的概念是“内部函数返回到函数外面，这样函数外面就保留了对内部函数的索引。所以如果在函数外面一直留存这个索引，那就会导致闭包”。

使用pm2可以设置最大内存重启

使用`heapdump`分析工具

chrome -> snapshot

`node --expose-gc --inspect=9222 app.js`

[JavaScript 内存调试技巧与泄露分析](https://zhuanlan.zhihu.com/p/60848190)

