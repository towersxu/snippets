# less的函数与循环

定义函数

```less
  @bgcardList:a,b,c,d,e,f,g;
  .backgroundcard(@className,@pngName){
        .@{className}{
              background: url("./resource/@{pngName}.png") top/100% no-repeat;
        }
  }
  .loop(@i) when (@i < length(@bgcardList)+1){
    .backgroundcard(extract(@bgcardList, @i),extract(@bgcardList, @i));
    .loop(@i+1);
  }
  .loop(1);
```
