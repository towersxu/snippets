# 移动端开发遇到的问题

## 华为nova系列手机webview百度定位问题

  当时没有手机在身边复现，但是武研测试有。H5的地理位置API失败，百度地图自带的获取位置也失败。换成高德地图就好了。

## IOS.12.2 `input type="file"`使用trigger('click')的方式触发上传，在校信上失效的问题，微信有效。

  微信使用的自带的x5webview，校信使用的是系统webview，另外，QQ扫码进入页面使用是系统webview,点击聊天内容的链接进入的用的是x5webview???
  
  解决方法： 改为display: block; opacity: 0这种写法，而不是用js去触发点击。

  PS: IOS系统的webview还有`navigator.geolocation.getCurrentPosition`在非完全https站点（网站有http请求的图片）失效的问题。
  
  参考链接:
  [WebKit on iOS ignores trigger(‘click’) on file input](https://forums.meteor.com/t/webkit-on-ios-ignores-trigger-click-on-file-input/29828)

## Iphone 5c H5应用按home键退出，然后重新进入，有几率导致app卡死和闪退的问题。

    原因：查看了该H5应用代码，发现热点是使用canvas实现，但是canvas写的有问题。热点的涟漪效果的清除画布没有直接整体清除，而是一个一圈一圈的清除外部边框来实现涟漪的缩小效果(ノ｀Д`)ノ 。

## canvas内存问题， getContext('2d') returns null in Safari

  出现原因，一同事在使用canvas生成base64的时候，连续创建了几十个canvas，然后就报这个错了。后来改成了创建一个canvas来处理就没有这个问题了。

  参考链接：
  [getContext('2d') returns null in Safari 10](https://stackoverflow.com/questions/40482586/getcontext2d-returns-null-in-safari-10/43482153)

  [Maximum size of a `<canvas>` element](https://stackoverflow.com/questions/6081483/maximum-size-of-a-canvas-element)

## IOS webview禁止识别手机号，邮箱等

    ```html
      <meta name="format-detection" content="telephone=no,date=no,address=no,email=no,url=no" />
    ```

## 有些手机上传的图片会被旋转90度

  可以尝试用exif.js来解决

## ISO webview中调用Geolocation API，可能导致https环境无法加http图片

  初步怀疑是调用了地理位置API会导致CSP策略提升，记得那里看到过，但是没有搜索到。

  解决办法，首先，由于H5服务这套业务逻辑，是不可以然让所有的业务服务器支持https的，因为有的服务是客户自己定制的。

  所以只有在H5服务上用nginx做图片代理, 即业务访问的图片`http://b.com/zbpb/api/getfile.do?path=duty/image/reduce/a.jpeg`可以通过`https://h5.com/image-proxy?url=http://b.com/zbpb/api/getfile.do?path=duty/image/reduce/a.jpeg`来访问。

    ```shell
    location ~/image-proxy {
        if ($query_string ~* ^(.*)url=(.*)$){
            set $pic_url $2;
            proxy_pass $pic_url;
        }
    }
    ```
另外，在本地模拟的时候，出现502错误，是因为*在Ngnix中如果用变量作为反向代理的地址时，可能会出现“no resolver defined to resolve xxx.xxx”的问题*，原因是 Nginx 0.6.18以后的版本中启用了一个resolver指令，在使用变量来构造某个server地址的时候一定要用resolver指令来指定DNS服务器的地址，所以解决这个问题的方法很简单：在nginx的配置文件中的http{}部分添加一行DNS解析即可，注意，要写在nginx配置的http{}内。[参考地址](https://blog.csdn.net/ywq935/article/details/81984878)

## ios WKWebView之视频无法播放

[ios WKWebView之视频无法播放](https://blog.csdn.net/weixin_40200876/article/details/86629900)

ios视频不自动全屏播放处理, 给video同时加上 webkit-playsinline和playsinline就好了，前者针对I0S9，后者针对IOS10和11

[加了webkit-playsinline，ios9.2.3可以不全屏，但是IOS11还是会自动全屏](https://segmentfault.com/q/1010000012768330?sort=created)
