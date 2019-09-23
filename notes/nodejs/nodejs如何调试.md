# nodejs如何调试

使用inspect

新建文件.vscode/launch.json

配置内容为

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "attach",
      "name": "Node: Nodemon",
      "processId": "${command:PickProcess}",
      "restart": true,
      "protocol": "inspector"
    }
  ]
}
```

使用nodemon启动服务

.package.json

```json
script: {
  "dev": "nodemon --inspect server.ts"
}
```

启动了服务后，点击debug图标，选择对应的inspect就可以调试。

这个调试还可以在Chrome上进行。地址栏输入`chrome://inspect/#devices`即可
