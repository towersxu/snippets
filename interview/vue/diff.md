# vue diff算法效率为什么高

![img](https://github.com/towersxu/snippets/raw/master/img/diff.png)

位于patch.js中， 只会同级比较，不会跨层级比较。

1. patch(oldValue, Vnode)
2. isSameVnode
3. no-> replace（只有相同的node才值得比较，不同的直接替换节点。）
4. yes -> patchVNode
5. patchVNode
  
  - 这两个节点文本不同，并且是文本节点，则直接替换文本
  - 这两个节点子节点不同，则updateChildren

6. updateChildren(依次按照顺序比较所有的节点，这里面有涉及到对key相同的复用。也就是对list顺序改变的处理。)

具体： 有一个while循环，分为oldStartIdx、oldEndIdx、newStartIdx 、newEndIdx，在循环结束之前进行此处。
