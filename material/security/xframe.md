# 点击劫持:无X-Frame-Options头信息

配置 nginx 发送 X-Frame-Options 响应头，针对项目增加location配置:

```shell
add_header X-Frame-Options SAMEORIGIN;
```

完整配置如下

```shell

location / {
  proxy_pass http://server_portal;
  add_header X-Frame-Options SAMEORIGIN;
  access_log off;
  proxy_redirect off;
  client_max_body_size  1000m;
}
```

