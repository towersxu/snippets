# 移动端开发遇到的问题

1. 华为nova系列手机webview百度定位问题

  当时没有手机在身边复现，但是武研测试有。H5的地理位置API失败，百度地图自带的获取位置也失败。换成高德地图就好了。

2.IOS.12.2 `input type="file"`使用trigger('click')的方式触发上传，在校信上失效的问题，微信有效。

  微信使用的自带的x5webview，校信使用的是系统webview，另外，QQ扫码进入页面使用是系统webview,点击聊天内容的链接进入的用的是x5webview???
  
  解决方法： 改为display: block; opacity: 0这种写法，而不是用js去触发点击。

  PS: IOS系统的webview还有`navigator.geolocation.getCurrentPosition`在非完全https站点（网站有http请求的图片）失效的问题。
  
  参考链接:
  [WebKit on iOS ignores trigger(‘click’) on file input](https://forums.meteor.com/t/webkit-on-ios-ignores-trigger-click-on-file-input/29828)

3.Iphone 5c H5应用按home键退出，然后重新进入，有几率导致app卡死和闪退的问题。

    原因：查看了该H5应用代码，发现热点是使用canvas实现，但是canvas写的有问题。热点的涟漪效果的清除画布没有直接整体清除，而是一个一圈一圈的清除外部边框来实现涟漪的缩小效果(ノ｀Д`)ノ 。

4.canvas内存问题， getContext('2d') returns null in Safari

  出现原因，一同事在使用canvas生成base64的时候，连续创建了几十个canvas，然后就报这个错了。后来改成了创建一个canvas来处理就没有这个问题了。

  参考链接：
  [getContext('2d') returns null in Safari 10](https://stackoverflow.com/questions/40482586/getcontext2d-returns-null-in-safari-10/43482153)

  [Maximum size of a <canvas> element](https://stackoverflow.com/questions/6081483/maximum-size-of-a-canvas-element)
