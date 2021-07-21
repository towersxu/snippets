# github page部署

## 配置action

1. 新建`.github/workflows/gh-pages.yaml`。
2. 通过gh-pages中的脚步执行，将代码打包为可以直接使用的静态资源。
3. 使用`peaceiris/actions-gh-pages`, 会自动将静态资源提交到新的分支`gh-pages`。

## 设置pages

1. 进入`settings/pages`
2. `source`选择`gh-pages`

## 自定义域名

1. 去自己的域名管理，使用cname的方式配置域名。
2. 将配置的域名填写到`Custom domain`中，等待github pages验证成功。
3. 验证成功后，可以开启`enforce https`。（证书不用自己去申请了，github会自动提供证书。）
