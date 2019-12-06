# event相关问题整理

## event.target 和 event.currentTarget 的区别

evnet.target表示的是事件触发的元素，event.currentTarget表示的是事件绑定的元素。

## EventTarget.addEventListener的第三个参数有哪些选项

第三个参数以前的boolean，当为true的时候, 表示在捕获阶段触发事件。
也就是说，当多个嵌套的DOM点击上面都有监听事件的时候，如果都设置为true。
则先触发父节点的事件，在触发子节点的事件。

如果为false,也就是默认情况.则先触发点击元素上面的事件，再冒泡去触发其父节点上面的事件。

现在第三个参数可以是一个对象，对象可选参数有

- capture: Boolean，同之前的默认值，true表示 listener 会在该类型的事件捕获阶段传播到该 EventTarget 时触发。
- once:  Boolean，表示 listener 在添加之后最多只调用一次。如果是 true， listener 会在其被调用之后自动移除。
- passive: Boolean，设置为true时，表示 listener 永远不会调用 preventDefault()。如果 listener 仍然调用了这个函数，客户端将会忽略它并抛出一个控制台警告。
