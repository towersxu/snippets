# 使用jest测试typescript项目

在做一个事情前，首先需要回答的就是“为什么做？”

## 为什么要加单元测试

单元测试的优点有很多，大家大多都知道，比如增加代码质量，减少BUG，让代码更容易维护等，这些术语类的描述我就不多赘了。

就我个人来说，我不觉得任何项目都必须有单元测试，也不觉得一个项目没有单元测试就特别low。就目前前端的整体环境来说，要求单元测试应用到项目中的前端团队并不多，因为前端和后端最大的不同在于前端是用户可见的，而这种可见的也带来了很多变化。

- 在业务方面来看，因为是可见的，所以会促使我们产品的迭代中，为用户提供更优美的界面，更流畅的交互，这导致我们的功能是不稳定的；
- 在技术方面来看，目前整个前端社区是非常活跃的。活跃的原因主要在于为了更好的用户体验，我们的运行环境（不管是浏览器还是nodejs）都在不停的提供新的API。为了更好的开发体验，我们的框架、语法也在不停的升级，这导致我们代码也是不稳定的。
这些不稳定也会导致我们的测试代码也不稳定，当一个项目中存在大量的测试用例时。这些不稳定的测试代码不仅不能让代码更容易维护，可能反而会成为我们快速迭代的拖累。

一般情况下，我们是带有业务的项目是不写单元测试的，对于一些基础库或插件，是有必要进行单元测试的。使用单元测试可以将特殊的业务逻辑以测试用例的方式来监控。因为这些特殊业务逻辑不是可见的，所以特别容易在版本迭代的过程中被遗忘。可能就会出现改着改着逻辑被改没了的情况。有了单元测试我们就能放心的修改代码了。

## 单元测试

单元测试有多种方式。前几年较为流行的是karam + mocha + chai + istanbul+..., 优点是前面的任何单词都可以替换的，也有很多选择。缺点是需要花较多时间来捣鼓，记得以前集成它们的时候遇到了不少问题。所以选择了另外一种目前较为主流的测试框架jest，它自己内部集成了很多的常用的测试工具，能实现开箱即用。当然再好用的东西也会因为第一次用有很多不熟的地方，这里把他们记录下来。

### 支持typescript+vue

大多数情况下，前端的测试工具都是默认支持的原生JS。而在我们的项目开发过程中，一般写的是vue、react或者typescript，他们的很多写法在默认的运行环境（nodejs或者browser）都是不支持。所以我们一般都是会使用babel或者webpack loader来对他们进行转换。在测试用例运行的时候也同理。

jest支持配置`transform`来对自定义语法在测试用例运行的时候进行转换。例如vue就可以使用vue官方提供的`vue-jest`；typescript可以使用`ts-jest`，但是这个项目中，对于typescript我是使用babel的`@babel/preset-typescript`来进行转换的，所以这里使用babel-jest即可。

```js
 // jest.config.js
 transform: {
    "^.+\\.[jt]sx?$": "babel-jest",
    ".*\\.(vue)$": "vue-jest"
 }
```

### mock网络请求

一般情况下，我们在测试用例运行的时候，遇到需要向服务器获取数据的情况，我们是不会真正的去服务端获取数据的，而是本地模
拟服务器返回的数据。这样做的原因如下：

- 测试用例不依赖后端的返回结果，以保障测试用例的稳定性。
- 减少因为网络请求延迟，提高测试用例执行效率，进而提高开发效率。
- 在CI环境，避免因为网络原因，导致测试用例执行失败。

jest提供了mock方法，帮助我们在本地模拟网络请求。以engine中需要向后端获取表单数据为例：

```js
// engine.ts
import * as services from '@/services/services'
// ...
await services.show()
```

```js
测试代码如下：
// engine.test.js
jest.mock('@/services/services')

describe('sdk engine module', () => {})
```

services目录内容如下：

```js
services/services.ts --> 真实代码使用的文件
services/__mocks__/data_user_form.json --> 模拟数据
services/__mocks__/services.ts --> mock文件

// services/__mocks__/services.ts mock内容
const userData = require('./data_user_form.json')
export function show () {
  return new Promise((resolve) => {
    resolve(userDataEnd)
  }）
}
```

从上面的代码可以看到，在测试用例运行的时候，jest会自动去寻找mock文件对于目录下的__mocks__中的同名文件。我们可以在该文件中自由的写任何mock内容。

### mock全局对象

在项目的开发过程中，肯定会遇到使用挂到window上的一些对象。但是window在测试运行环境是不存在的，并且挂在其上面的对象也是不存在的。这里也需要我们mock一下。这里以vue为例：

首先，需要将原来的直接用window.Vue这种写法，改成在新建一个文件，将其export出来，然后在需要用的地方import

```js
// global.ts
export const vue = window.Vue

// vue-render.ts
import { vue } from '@/utils/global'
// ...
if (!vue) {
  throw new Error('缺少Vue对象，请提供window.Vue')
}
```

在测试文件mock global文件，并将window.vue换成当前node_modules里面的vue。注意，这里使用vue.runtime.min能避免其它类型vue文件过多日志的问题。

```js
// render.test.js
jest.mock('@/utils/global', () => {
  return {
    vue: require('vue/dist/vue.runtime.min')
  }
})
```

### 使用快照

jest还提供了一种快照功能，该功能可以把测试用例运行期间的DOM对象序列化，保存在测试用例同目录下创建__snapshots__里。然后在自后每次该用例运行的时候，如果DOM对象序列表结果发生了变化，则抛出错误。该功能可以方便开发者在开发的过程中，及时的知道自己的改动的影响范围。如果出现超出预期的影响范围，则可以及时修正。也极大的避免了因为开发人员因为自己对项目不熟悉，出现改了一个问题结果改出两个其它问题的情况。生成的snap文件如下：

```js
// test/__snapshots__/index.test.js.snap
// Jest Snapshot v1, https://goo.gl/fbAQLP


exports[`模块 调用实例的初始化方法，返回vue实例 1`] = `
<div
  class="opes-form"
>
  <div
    class="opes-card opes-card_wrapper"
  >
    <!---->
  </div>
</div>
```

## 写在最后

从这次加单元测试可以发现，jest本身易用性特别高，集成也特别方便。个人感觉就是写测试用例就是一个用代码模拟已有代码运行的过程。不用再过在意测试覆盖率
