# shell脚本相关笔记

执行shell的时候输出日志到指定文件

```shell
./startup.sh > ./startup.log 2>&1;
```

>表示将标准输出写入startup.log中，2>&1表示把错误也输入到startup中


查找文件体积超过1000M的文件

```shell
find / -type f -size +1000M
```
