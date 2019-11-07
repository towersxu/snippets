# 记录每天面试相关累积

## 2019年10月28日

- windowOrWorkerGlobalScop、worker、postmessage、结构化克隆算法
- blob如何转换成base64 FileReader、atob/btoa、Uint8Array、“=”填充
- String.fromCharCode(number): 将utf-16编码转换为字符串
- openAL
- OffscreenCanvas(离屏Canvas), 可以在worker中使用

## 2019年10月29日

- [Web Worker、Service Worker 和 Worklet](https://juejin.im/entry/5c50f22ef265da616b1115a3)
- worker里面可以继续使用new Worker
- DedicatedWorkerGlobalScope
- ServiceWorker、SharedWorker
- 浏览器渲染页面的流程（DOM树、Render树、合成）
- 线程与进程
- event loop以及微任务、宏任务； vue nextTick->mutationObserver->2.5+->MessageChannel
- MessageChannel既可以在worker中通信，也可以在iframe来通信。是宏任务，但是比setTimeout(0)
- Worklet 是浏览器渲染流中的钩子，可以让我们有浏览器渲染进程中底层的权限，比如样式和布局。Houdini、CSS TYPE OM
- AudioWorklet

## 2019年11月01日

- @babel/preset-env、browserslist、core-js、useBuiltInt(usage、entry)

## 2019年11月04日

- @babel/preset-typescript
- Browser进程（1个）、GPU进程（1个）、浏览器渲染进程（每个Tab一个）、第三方插件进程（每个插件一个）
- GUI渲染线程、JS引擎线程、事件触发线程、定时触发器线程、异步http请求线程
- webWorker是JS引擎开启的一个子线程
- SharedWorker是单独的一个进程，共所有的tab也用
- “js是单线程的”，这里的意思是js引擎是一个单线程的引擎，在一个浏览器的渲染进程中，只有一个线程是js引擎，其实还有其它的线程，比如GUI渲染线程、事件触发线程
- GUI渲染线程负责解析HTML,CSS,构建DOM树和RenderObject树，这个线程和js引擎线程被设计成互斥的，一个执行的时候另一个会被挂起。页面重绘(Layout)和回流（reflow）时这个线程就会执行。
- Render树是基于DOM树和Style rules生成的一个表示界面布局和样式的树。他和DOM树不是一一对应的，比如display:none的元素就不在Render树中。
- Render树print阶段分为Layout -> reflow -> composite(在GPU中执行)

## 2019年11月05日

- DOMContentLoaded事件触发时，仅当DOM加载完成，不包括样式表，图片。async加载的脚本也不一定完成。
- onload事件触发时，页面上所有的DOM，样式表图片都已经加载完成了。
- css是由单独的下载线程异步下载的，css加载不会阻塞DOM树解析（异步加载时DOM照常构建），但会阻塞render树渲染（渲染时需等css加载完毕，因为render树需要css信息）。
- 浏览器渲染的图层包括普通图层和复合图层。普通的文档流一般是一个默认复合图层，就算是absolute脱离了文档流仍然是属于默认复合图层。
- 可以通过硬件加速的方式声明一个新的复合图层，它会单独分配资源，也脱离文档流，所以不管怎么变换也不会影响默认复合层里的回流和重绘,仅仅会触发最后的composite。absolute变换会影响重绘。
- translate3d、translateZ、opacity过渡动画、canvas video等元素
- will-chang属性（这个比较偏僻），一般配合opacity与translate使用（而且经测试，除了上述可以引发硬件加速的属性外，其它属性并不会变成复合层）， 作用是提前告诉浏览器要变化，这样浏览器会开始做一些优化工作（这个最好用完后就释放）
- webkit CSS3中，如果这个元素添加了硬件加速，并且index层级比较低， 那么在这个元素的后面其它元素（层级比这个元素高的，或者相同的，并且releative或absolute属性相同的）， 会默认变为复合层渲染，如果处理不当会极大的影响性能
- setInterval的累积效应。setInterval则是每次都精确的隔一段时间推入一个事件 （但是，事件的实际执行时间不一定就准确，还有可能是这个事件还没执行完毕，下一个事件就来了）。而且把浏览器最小化显示等操作时，setInterval并不是不执行程序， 它会把setInterval的回调函数放在队列中，等浏览器窗口再次打开时，一瞬间全部执行时。JS高程中有提到，JS引擎会对setInterval进行优化，如果当前事件队列中有setInterval的回调，不会重复添加。
- arr.flat(Infinity)

```js
while (ary.some(Array.isArray)) {
  ary = [].concat(...ary);
}
```

length >>> 0, 字面意思是指"右移 0 位"，但实际上是把前面的空位用0填充，这里的作用是保证len为数字且为整数。

```js
null >>> 0  //0

undefined >>> 0  //0

void(0) >>> 0  //0

function a (){};  a >>> 0  //0

[] >>> 0  //0

var a = {}; a >>> 0  //0

123123 >>> 0  //123123

45.2 >>> 0  //45

0 >>> 0  //0

-0 >>> 0  //0

-1 >>> 0  //4294967295

-1212 >>> 0  //4294966084
```

flex

- 父容器

*flex-direction*主轴方向: row, row-reverse, column, column-reverse. 注意，真正显示的顺序还受到dirction属性影响

*flex-wrap*子元素堆叠方向: nowrap, wrap, wrap-reverse。 换行的时候，元素在新一行的位置受到flex-direction影响

*flex-flow*是flex-dirction和flex-wrap的简写，可以将两个属性合到一起写。

*justify-content*属性定义浏览器如何分配在父容器主轴上的元素之间的空间

content-distribution: space-between|space-around|space-evenly|streth(在规范中，chrome不生效？使用flex-grow)

content-position: center | start | end | flex-start | flex-end

overflow-position: unsafe | safe

*align-items*属性定义子元素在交叉轴上的对齐方式: center, flex-start, start等

*align-content*属性设置了浏览器如何沿着伸缩盒子容器（flexbox container）的纵轴和网格容器（Grid Container）的主轴在内容项之间和周围分配空间。该属性对单行弹性盒子模型无效。（即：带有flex-wrap: nowrap）。 取值有: center, start, flex-start, space-between.

*place-content*属性是align-content和justify-content的简写

- 子容器

*order*属性规定了弹性容器中的可伸缩项目在布局时的顺序。元素按照 order 属性的值的增序进行布局。拥有相同 order 属性值的元素按照它们在源代码中出现的顺序进行布局

注意: order 仅仅对元素的视觉顺序 (visual order) 产生作用，并不会影响元素的逻辑或 tab 顺序。 order 不可以用于非视觉媒体，例如 speech。

*flex-grow*: number, 定义在有空闲空间的时候，改元素放大的量，默认为0不放大。如果多个元素，按照定义的值的比例来放大。

*flex-shrink*: number, 定义在空间不足的时候，元素缩小的比例，默认为1,表示所有的元素按照比例缩小，如果设置为0表示空间不足也不缩小。如果设置为0的元素加起来超过父容器范围，则溢出。

*flex-basis*: string, flex 元素在主轴方向上的初始大小。当一个元素同时被设置了 flex-basis (除值为 auto 外) 和 width (或者在 flex-direction: column 情况下设置了height) , flex-basis 具有更高的优先级.

*align-self*: 子元素定义自身的对齐方式, 将覆盖父元素的align-items

*flex*: 子元素简写属性，用来设置 flex-grow, flex-shrink 与 flex-basis。

- clip-path: CSS 属性可以创建一个只有元素的部分区域可以显示的剪切区域。区域内的部分显示，区域外的隐藏。剪切区域是被引用内嵌的URL定义的路径或者外部svg的路径，或者作为一个形状例如circle().。clip-path属性代替了现在已经弃用的剪切 clip属性. 这个属性IE10也支持，但是在IE10上只支持url的方式。

## 2019年11月06日

vue的`compile`分为`parse`、`optimize`、`generate`3个阶段，最终得到render function。

*parse*阶段是利用正则表达式对template模板进行字符串解析（parseHTML, 在parseHTML的过程中就进行的AST元素的构建），得到指令、class、style等数据, 形成类似抽象语法树（默认中的javascript表达式没有进行语法分析，这也是vue在生成render的时候使用with的原因）。注意，这里的匹配是从前往后依次匹配的（词法分析-扫描），在while循环外部通过index记录匹配到哪里了，在while里面，通过正则，来截断html字符串，增加index。直到html字符串被全部匹配完。

*optimize*是用来标记这个节点是不是静态节点，优化效率，主要是判断这个节点是否有v-if,v-for,bind等

```js
function isStatic (node: ASTNode): boolean {
  if (node.type === 2) { // expression
    return false
  }
  if (node.type === 3) { // text
    return true
  }
  return !!(node.pre || (
    !node.hasBindings && // 不是动态绑定
    !node.if && !node.for && // 不是v-if,v-else v-for
    !isBuiltInTag(node.tag) && // 不是内置的tag(slot, components)
    isPlatformReservedTag(node.tag) && // 不是组件
    !isDirectChildOfTemplateFor(node) &&
    Object.keys(node).every(isStaticKey)
  ))
}
```

*generate*阶段是将AST转换为render function字符串

- 词法分析: 词法分析阶段是编译过程的第一个阶段。这个阶段的任务是从左到右一个字符一个字符地读入源程序，即对构成源程序的字符流进行扫描然后根据构词规则识别单词(也称单词符号或符号)。
- 语法分析: 语法分析是编译过程的一个逻辑阶段。语法分析的任务是在词法分析的基础上将单词序列组合成各类语法短语，如“程序”，“语句”，“表达式”等等.语法分析程序判断源程序在结构上是否正确.源程序的结构由上下文无关文法描述.
- 语义分析: 语义分析是编译过程的一个逻辑阶段. 语义分析的任务是对结构上正确的源程序进行上下文有关性质的审查, 进行类型审查.

- with

```js
var a, x, y;
var r = 10, r1 = 20;
Math.r = 100;
with (Math) {
  a = PI * r * r1; // 这里r是100， r1是20
  x = r * cos(PI);
  y = r * sin(PI / 2);
}
console.log(a, x, y) // 6283.185307179587 -100 100
```

可以看到，with里面的变量，默认指向的是Math,而不是window. 所以，with的作用是使用一个块里面的代码片段所声明的变量，默认在with这个对象上找，如果找不到再去外部变量找（这个时候查找会相对较慢）。还有缺点是语义不明，如果Math.r属性在代码中没有，而是对象自带的，可能会引起误解。所以不推荐使用。

在vue template转render中使用了with(this)，其意义是把template属性中的表达式绑定到this.比如template中有v-bind:click="clickHandle", 这里在转换后，clickHandle中的this就会绑定为vue实例。

- vue的响应式系统，首先data返回的对象的所有属性都被Object.defineProperty定义getter和setter方法，在getter中将当前的watcher对象（Dep.target, 如果存在的话）存放到依赖收集对象dep中。在setter的时候，将对象的变更发布给所有的watcher。那什么时候Dep.target是指向的watcher的呢？watcher是在mountComponent的时候创建的，就是说这个组件被挂载的时候（还有就是computed、watch的时候也会创建watcher），Dep.target就是指向这个组件的Watcher。所以，一个watch对应着一个组件的data，如果有computed、watch，在这个时候也会分别在创建watcher对象来对应。

mountComponent -> 创建 watcher -> watcher绑定到Dep.target上。 set的时候触发get，get将当前的watcher(可以理解为一个全局变量Dep.target)放到这个属性的订阅者列表`subs`中(这里有一个在watcher中过滤的过程`addDep`，就是如果watcher已经被加入到subs中了，是不会再次加入的。)

set的时候，通知这个属性的subs中的所有watcher

- vnode是一个描述vue节点信息的对象，是对真实DOM的映射。这个对象的属性包含了节点名称，子节点，节点上的属性等信息

- vue和react的diff算法都是只比较同层级的不一样的差异，然后将这些差异更新到视图上。因为在项目中，节点的变化大多数都是隐藏、显示和文本的更新。

vue是如何判断两个节点不一样的？判断两个节点的key、 tag、 isComment、data同时定义或者不定义、input标签的话要类型相同。

在当新老 VNode 节点都是 isStatic（静态的），并且 key 相同时，只要将 componentInstance 与 elm 从老 VNode 节点“拿过来”即可。这里的 isStatic 也就是前面提到过的「编译」的时候会将静态节点标记出来，这样就可以跳过比对的过程。

当新 VNode 节点是文本节点的时候，直接用 setTextContent 来设置 text，这里的 nodeOps 是一个适配层，根据不同平台提供不同的操作平台 DOM 的方法，实现跨平台。


