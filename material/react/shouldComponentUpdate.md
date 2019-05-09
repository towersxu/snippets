# shouldComponentUpdate

熟悉 React 的都知道，React 做性能优化时有一个避免重复渲染的大招，就是使用 `shouldComponentUpdate()`，但它默认返回 `true`，即始终会执行 `render()` 方法，然后做 Virtual DOM 比较，并得出是否需要做真实 DOM 更新，这里往往会带来很多无必要的渲染并成为性能瓶颈。

当然我们也可以在 `shouldComponentUpdate()` 中使用使用 `deepCopy` 和 `deepCompare` 来避免无必要的 `render()`，但 *deepCopy 和 deepCompare 一般都是非常耗性能的*。

*Immutable 则提供了简洁高效的判断数据是否变化的方法*，只需 `===` 和 `is` 比较就能知道是否需要执行 `render()`，而这个操作几乎 0 成本，所以可以极大提高性能。修改后的 `shouldComponentUpdate` 是这样的：
> 注意：React 中规定 state 和 props 只能是一个普通对象，所以比较时要比较对象的 key

```javascript
import { is } from 'immutable';

shouldComponentUpdate: (nextProps = {}, nextState = {}) => {
  const thisProps = this.props || {}, thisState = this.state || {};

  if (Object.keys(thisProps).length !== Object.keys(nextProps).length ||
      Object.keys(thisState).length !== Object.keys(nextState).length) {
    return true;
  }

  for (const key in nextProps) {
    if (!is(thisProps[key], nextProps[key])) {
      return true;
    }
  }

  for (const key in nextState) {
    if (thisState[key] !== nextState[key] && !is(thisState[key], nextState[key])) {
      return true;
    }
  }
  return false;
}
```

使用 Immutable 后，如下图，当红色节点的 state 变化后，不会再渲染树中的所有节点，而是只渲染图中绿色的部分：
![img](./images/demo2.png)

你也可以借助 `React.addons.PureRenderMixin` 或支持 class 语法的 [pure-render-decorator](felixgirault/pure-render-decorator · GitHub) 来实现。