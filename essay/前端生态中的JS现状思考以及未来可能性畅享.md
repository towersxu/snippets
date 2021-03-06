# 前端生态中的UI组件库的思考

我是2013年实习的时候开始接触前端的，当时还是一个Java实习生，但是刚好团队里面的UI设计生孩子了，休半年产假（是的，那个时候很多公司还没有前端，css和html是UI来写的）。于是我就开始系统学习前端相关知识，然后兼做某个项目中的前端工作。那个时候nodejs在国内已经有一定的名气了，但是还没有大规模应用起来，而且其名气也仅仅限于做服务端server，而不是前端工程化。至于ES6、HTML5这种，在国内使用的公司也不多，毕竟我当时还在兼容IE6。

那个时候，seaJS、requireJs、backbone这种前端单页面应用的早期形态在前端圈子里面还是很火的，但是主要使用的还是一些比较”极客“或者前端。当然那个时候easyUI、bootstrap、jqueryUI在国内还是占主流。


## 关于一个通用UI组件库的思考

### 挑战

”我们要开发一个UI组件库“，大家听到这句话的第一反应基本都是”重复造轮子“、”又是一个KPI项目“、“这一幕我在之前公司见过，开发的人离职后大家又换回element或antd了”。

是的，UI组件库目前前端社区马太效应非常明显，在PC端上用vue的，就用element；用react的，就用antd，还有极少部分人在用angular, UI组件库一般选择material。因为在几年前，那个时候UI组件库还百家争鸣的时候，大家或多或少都踩过各种UI组件库的坑。当UI要的交互用的组件库没有的时候；当出现某个小功能发现这个组件库不支持的时候；当发现BUG结果组件库开发者跑路了的时候；当某一天发现官网都打不开了的时候。所以大家都很珍惜现在这种来之不易的安宁，不希望再回到之前的那种混乱状态。

### 现状

1. 我们已经知道UI组件库已经和vue、react这种基础框架已经绑定了。这也就意味着当基础框架升级后，UI组件库也必须跟着升级。当出现大版本升级的时候，UI组件库基本上可以说是重新写了。比如去年element3就因为vue升级为3.0版本陷入了开发团队跑路的风波（当然，也可能是因为饿了么被阿里收购了~）。
2. 目前很多团队是没有前端的，但是他们可能还是需要写一些简单的页面，比如配置页。他们不愿意因为只写一点简单的页面，就系统的去学习前端的工程化、vue、elementUI这些。
3. 还有很多老系统是非前后端分离的，服务端生成jsp, 前端用jquery。采用工程化改造代价太大。（不要怀疑，虽然现在已经是21世纪20年代了）。
4. 我们经历了将jquery项目重构为angular.js项目，然后又是将angular.js重构为vue项目，未来几年大概率会经历vue2重构为vue3项目。这期间还伴随着typescript这种js语言的超集进行的改版。
5. 在微前端方案下，多个系统采用的技术栈是不同的，合并到一起后由于UI组件库的不同，导致交互&样式较难做到统一。
6. 在调试的时候，因为UI组件库是一个经过编译打包后的组件（例如vue组件库经过vue-loader转换为js，然后在由babel转换为es5），对于开发者来说，是一个黑盒。当UI组件库出现问题的时候，是开发者非常难定位，这也是大多数UI组件库猝死的原因之一。

从上面的几点可以看到，我们的UI组件库其实也是一个不稳定态。这种不稳定其实也受到我们前端这个职能的特性影响的。

- 在业务方面来看，因为我们最贴近用户，所以会促使我们产品的迭代中，为用户提供更优美的界面，更流畅的交互，这导致我们的功能是不稳定的；
- 在技术方面来看，目前整个前端社区是非常活跃的。活跃的原因主要在于为了更好的用户体验，我们的运行环境（不管是浏览器还是nodejs）都在不停的提供新的API。为了更好的开发体验，我们的框架、语法也在不停的升级，这导致我们代码也是不稳定的。

既然我们的基础框架本来就是一个不稳定的状态，我们在基础框架上搭建的UI组件库必然也是不稳定的。所以，如果我们基于相对稳定的浏览器提供的原生特性来实现一个组件库，是不是比基于基础框架实现的组件库更加稳定一些？这种通用UI组件库优点有：
- 框架无关性，不论项目使用vue、react、jquery、或者以后还出现其他什么框架，只要是在浏览器上使用的，都可以用个。
- 运行时调试，因为这个框架是基于浏览器提供的原始API。可以在开发阶段直接引入非压缩版本，然后浏览器直接调试。

目前，js也走上了和后端类似的路，那就是开发时我们写的代码需要经过编译后才能在浏览器上运行。例如我们用webpack来处理typescript写的vue项目，那么我们需要先用ts-loader 编译typescript，然后在用vue-loader便于vue，然后再用babel-loader编译为es5。这种编译的生态有好的方面，我们可以自由定义开发者代码的写法，而不局限于浏览器支持啥，这样让开发者效率更高，心情更好。但是这种编译也有缺点：
- 调试不方便了，虽然我们有source map。但是相比于直接使用浏览器本身提供的调试方式，编译后的还是诸多不便。比如定位事件监听创建的地方、定位DOM是哪里添加的之类的。
- js和后端大多数语言的不同，那就js本身是运行时编译的。我们开发的那些编译只是把我写的代码转换成原生js，和后端那种直接编译成机器码还是不同的。（WASM？）

## 目标
假设我们有这样一个UI组件库，这个UI组件库是纯原生js实现的。能兼容vue、react、jQuery等各种框架，且用户也和目前的element或者antd类似，而且更加利于直接在浏览器上调试。那么大家是不是有意愿试试？

这个和bootstrap的区别是啥？

这个和umi、lit-element相比有什么优势，这两个star这么高的组件库，都没有人用到实际项目中，为什么会用新做的？

为什么已有的web components组件库没有人用？

https://www.infoq.cn/article/asjhHAmupqtcx5oGrb4b

## 前端时间线



