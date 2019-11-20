# Java中的缓存池

Integer缓存池：在 Java 8 中，Integer 缓存池的大小默认为 -128~127，在启动JVM的时候，可以设置AutoBoxCacheMax来指定缓冲池大小。

使用`Integer.valueOf`将从缓存池中获取数据

String Pool: 字符串常量池（String Pool）保存着所有字符串字面量（literal strings）,这些字面量在编译时期就确定。
不仅如此，还可以使用String的`intern`方在运行的过程中将字符串添加到String Pool中。如果采用直面量创建字符串（`String s1 = 'aaa'`）
那么会自动放入String Pool中。



