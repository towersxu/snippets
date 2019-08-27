# 其它问题

## 图片垂直居中时，IE自动给图片添加宽高的问题。
  
  强制设置样式width:auto;height:auto
  
  ```css
  .feedback-f img {
    max-width: 165px;
    max-height: 122px;
    transform: translate(-50%, -50%);
    position: absolute;
    height: auto;
    width: auto;
    top: 50%;
    left: 50%;
  }
  ```

## 服务器上传超过1M的文件报500的问题

一、修改nginx目录下的nginx.conf 默认是8m，改为1000m

二、修改项目配置的conf，在location内增加client_max_body_size为100m

```shell
    location / {
            client_max_body_size 100m;
    }

```

三、修改后还是上传不了，日期提示open() "/var/lib/nginx/tmp/client_body/0000000045" failed (13: Permission denied)

查看/var/lib/nginx 目录，发现权限是drwx------，权限不足，修改为chomd -R 755 nginx
