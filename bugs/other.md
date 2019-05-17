# 其它问题

- 图片垂直居中时，IE自动给图片添加宽高的问题。
  
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