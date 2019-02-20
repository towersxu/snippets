# 跨站点请求伪造

限制 HTTP Referer 头，检查请求来源是否来自合法页面，针对检测出漏洞的项目增加nginx配置，配置如下:

例：以下为portal配置，在location中新增如下配置，taobao与baidu为白名单，非白名网站访问我方网站将无法访问并返回403状态，可根据环境需要设置白名单

```shell
valid_referers none blocked server_names *.taobao.com *.baidu.com;
if ($invalid_referer) {
    return 403;
}
```

完整配置如下:

```shell
server {
  listen 80;
  server_name example.com;
  include my.conf;
  location / {
    access_log off;
    proxy_redirect off;
    client_max_body_size  100m;
    proxy_pass http://server_8080;
    valid_referers none blocked server_names *.example.com *.baidu.com;
    if ($invalid_referer) {
        return 403;
    }
  }
}
```
