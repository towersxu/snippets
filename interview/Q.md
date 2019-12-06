# 面试问题

答案在note中，但是详细答案可能在各笔记里面甚至已读文章里面

1. 在开发公共控件的时候，如果配置babel，使其兼容指定的浏览器。具体配置项是啥，这些配置项有什么用？
2. 如果想要typescript写，又怎么配置使typescript和babel相互配合？有什么好处？
3. 浏览器有多少种进程？
4. 什么是浏览器的渲染进程？他有哪些线程？webworker和他是什么关系？
5. 说一下你对js是单线程的这句话的理解？在浏览器中还是什么其它线程？
6. GUI渲染线程有什么作用？
7. 浏览器的render树是啥？
8. DOMContentLoaded和load事件有什么区别？
9. 什么是CSS硬件加速，如何实现CSS硬件加速，盲目的使用CSS硬件加速会有什么问题？
10. 为什么在开发的过程中，我们常用setTimeout模拟setInterval，或者特殊场合直接用requestAnimationFrame
11. 数组的reduce方法怎么用？
12. js中`a >>> 0`是什么意思？有什么用？
13. js中`2 ** 10` 是什么意思？
14. js中的this有那几种情况？
15. 如何手写代码实现深拷贝，深拷贝需要保持循环引用？如果用到了map，是不是有强引用关系的问题？如何解决？
16. flex属性有那些？
17. vue的template 模板是怎样通过 Compile 编译的？
18. 在vue的render时使用到了with, with是什么？有什么用？
19. vue的响应式系统是怎么实现的？一个vue组件的实例会有多少个watcher?
20. vue的vnode是什么？
21. vue的diff算法是如何计算的？
22. typescript的交叉类型、联合类型、类型保护、类型断言是啥？
23. type和interface的区别？
24. 什么是typescript的泛型，有什么用？
25. typescript中我们见到的.d.ts文件有什么用？
26. typescript中的声明合并是什么？
27. typescript怎么写iterator？
28. typescript怎么写装饰器？
29. JavaScript Reflect Metadata是什么？
30. 贪心、回溯、分治、动态规划是什么？有什么区别？
31. js有那些方法可以检测浏览器是否支持CSS某些写法？
32. 如何计算出一组数中有序对的个数？
33. 背包问题和0-1背包问题是什么？有什么区别？
34. 说说http、http2、http3
35. vue 3.0为什么选择proxy？proxy是什么，有什么用？reflect是什么，有什么用？
36. 如何禁止修改一个对象，让其readonly？为什么CONST不行, 如果是用preventExtensions？
37. js的严格模式和非严格模式的区别
38. caller和callee的区别？
39. generator在实际中有那些应用？
40. 在自定义遍历器iterator函数的时候？可以写next和return，return有什么用？
41. ISP是什么？
42. JS的TypedArray是什么？有什么用？
43. generator函数如何自执行？
44. ArrayBuffer和SharedArrayBuffer有什么用？Atomics是什么？
45. http有多少种请求方式？
46. 数据库的事务具有哪些特性？
47. 数据库范式是那些？
48. 悲观锁和乐观锁的区别？
49. webpack是如何提高编译速度的？
50. 如何提高nodejs启动速度？
51. babel是如何把我们编写的代码（typescript、vue、react等）转换成es5代码的
52. npx与npm的区别
53. java基本类型有哪些？和js的基本类型有什么异同？
54. Java缓存池的大小是多少？
55. JAVA的final关键字有什么用？
56. 重写和重载的区别是什么？
57. 什么是多态？多态和重写、重载的关系是什么？
58. 为什么String被声明为final？
59. String, StringBuffer and StringBuilder的区别？
60. 为什么Java switch的声明的类型不能为long？还可以为那些类型？
61. Java有那些访问权限修饰符？
62. 为什么在Java开发的时候，我们常将类的属性定义为私有，然后采用公有的方法来修改和获取这个属性的值。
63. Java抽象类、普通类、接口的区别是什么？
64. Java8中接口的默认方法是什么？
65. redis持久化的方式是什么？
66. 什么情况下redis会出现高延迟？
67. 在平常的开发中，如何写判断一个值是否等于"success"？
68. hashCode方法里为什么选择数字31作为生成hashCode值的乘数?
69. Java如何调用内部类？
70. Java的反射有什么用？
71. Java为什么有的人建议使用 List 来代替 Array？
72. 什么是Java的序列化，序列化有什么作用？
73. 什么是Vector，有什么优缺点，有什么替代方案？
74. java.util.concurrent有什么用？
75. Promise有那些状态?
76. 在Promise内部，先resolve，再rejected, 请问Promise的结果走的是then还是catch?
77. Promise对象内部的异步方法已经resolve了之后，再去调用then方法，then方法会执行吗？
78. Promise有什么优缺点？
79. 如何取消或中断Promise?
80. Promise then里面return false会被catch捕获吗？
81. Promise的then方法返回的是Promise对象是原来的Promise对象吗？
82. Promise all中的某个实例p2如果有catch方法，那么当这个实例p2报错后，整个Promise.all最终会调用resolve还是reject？
83. 如果不关心成功或者失败，只希望判断所有的请求都已经结束，使用Promise应该怎么写呢？
84. Promise.any和Promise.race的区别
85. 如何将一个函数f，不管其是同步还是异步，使用Promise来处理它，在then里面得到执行结果？用catch方法处理f抛出的错误。
86. 在js最开始使用let定义一个变量，这个变量会不会绑定到window上？
87. 什么是块级作用域？
88. 什么是暂时性死区？
89. 如果想要声明一个对象为常量，应该怎么做？
90. js目前有那些声明变量的方法?
91. Object.keys(a)、Object.getOwnPropertyNames(a)、Reflect.ownKeys(a)以及for in、Object.getOwnPropertyDescriptors的区别？
92. 在ES6中，如何实现class的私有属性？
93. Object.is有什么用，和===有什么区别？
94. Object.assign的参数可以不是对象吗？
95. Object.assign可以拷贝原型链上的属性吗？不可枚举的呢？Symbol呢？
96. Object.assign可以用在数组上吗？
97. Object.assign能拷贝get和set属性吗，Symbol和enumerable为false的属性呢？
98. 如果想要拷贝一个对象，并且还想合并其get和set之类所有的属性怎么做？
99. 如何将一个对象设置为另一个对象的原型？
100. 如何使用for of遍历对象，能遍历到原型链上的对象吗？能遍历enumerable为false的属性吗？能遍历Symbol吗？
101. Map与Object的区别是？
102. 如何给请求返回的data设置默认值
103. 如果希望把上面的data改成另一个名字呢？因为data在前面已经有声明的了。
104. 如何将一个对象中除了某些属性之外，剩下的属性作为一个新对象。
105. 解构是否能用到Set上面？
106. 是否能解构字符串？
107. 解构那些情况可以用括号，那些情况不能用括号？
108. 如何使用解构交换两个变量的值？
109. js如何表示超出\uFFFF范围的字符串
110. 服务器输出的格式正确的JSON什么情况下会被JSON.parse报错
111. String.fromCharCode()和String.fromCodePoint()的区别
112. String.raw有什么用处
113. 如何获取“含有四个字节unicode字符的字符串”的长度
114. 如何判断一个字符是两个字节还是由四个字节组成的
115. 字符串的normalize方法有什么用
116. includes、startsWith、endsWith的区别
117. ES还有那些新的字符串的方法
118. 正则表达式能匹配四字节字符吗
119. 正则表达式中`y`修饰符有什么用
120. js如何获取一个正则表达式的修饰符
121. 正则表达式`s`修饰符有什么用
122. 正则表达式的先行断言和后行断言是什么
123. 正则表达式属性类是什么
124. 什么是具名组匹配
125. 字符串的matchAll返回的是什么
126. 有那些办法可以解决`0.1 + 0.2`不等于0.3的问题
127. 如何在js里面直接写`二进制`、`八进制`、`十六进制`的数字
128. 如何判断一个值是否是`NaN`
129. js中数字有效的范围是多少？如何判断一个数字的值是否在数字的有效范围中
130. 数字的最大值和最大安全整数有什么区别，如何判断一个数是安全整数
131. `Number.EPSILON`有什么用
132. 如何去掉一个数的小数部分
133. 如何求一个数的立方根、平方根
134. Math.imul有什么用？为什么不直接用`*`来乘
135. Math.fround是什么，有什么用
136. `2 ** 3 ** 2`返回的结果是
137. 函数的length属性是什么意思，如果函数的参数有默认值，length会增加吗，如果是rest参数呢
138. 如何利用参数默认值，可以指定某一个参数不得省略，如果省略就抛出一个错误
139. 函数参数有默认值了，为什么就不能把函数设置为严格模式
140. 箭头函数能用arguments吗
141. 什么是尾调用、什么是尾递归
142. 什么是柯里化
143. 函数参数的尾逗号
144. [...5] 如何扩展成 [0,1,2,3,4,5]
145. 如何浅拷贝一个数组，分别说出ES5和ES6的方法
146. 什么情况下能使用扩展运算符
147. 如何求两个Set的并集、交集和差集
148. Symbol的描述有什么用
149. Array.from可以转化那些类型的数据为数组，在转换的过程中，能对其进行修改吗
150. Array.of有什么用
151. 数组方法copyWithin有什么用
152. 数组方法fill会覆盖数组的原有值吗
153. 如何判断一个值是否在数组中
154. flat和flapMap有什么用
155. 数组中的空位可以被遍历到吗
156. AMD、CMD、CommonJS和UMD
157. 可枚举属性enumerable被设置为false，会影响那些情况
158. `super`只能用到class的constructor中吗
159. WeakSet的成员能是数字吗
160. WeakMap在实际开发中有那些使用场景
161. proxy支持哪些拦截操作
162. proxy代理的时候，怎么处理this指向问题
163. Proxy.revocable有什么用
164. ES6为什么要新增Reflect对象
165. Reflect有哪些方法
166. ES6 import命令如何对导入的变量进行重命名
167. import命令和import()函数的区别
168. 可以直接写`export 42`吗
169. 如何实现跨模块声明常量
170. ES6 module与CommonJS的差别
171. ES6和CommonJS是如何解决循环加载的问题
172. Reflect和Proxy里面`get`和`set`方法的receiver参数是什么，和target有什么区别
173. 请手写一个实现一个对象可遍历的方法
174. 如何处理iterator遍历中断和异常
175. `for...of`、`for...in`、`forEach`、`for`循环的异同
176. 什么是generator
177. yield表达式有返回值吗
178. generator怎么实现在外部调用的过程中，向其内部抛出异常
179. 如何让Generator函数返回一个正常的对象实例，既可以用next方法，又可以获得正常的this
180. generator有什么用
181. async与generator的区别
182. 如何使用async实现请求失败重复指定次数再次请求
183. await是继发关系，那么如何用await实现多个请求并发
184. 如何向一个现成的class添加新的方法
185. class必须要用new调用，如果在ES5中模拟这个特性
186. 如何判断一个类是否继承了另一个类
187. class里面的方法还可以用use strict吗
188. class里面的方法的this一定指向的类的实例吗
189. class的static方法能用this吗
190. class继承的时候super指向的是什么
191. 子类普通方法中通过super调用父类的方法时，父类方法中的this指向的是什么
192. 为什么ES6可以自定义原生数据结构（比如Array、String等）的子类，而`ES5`无法做到的

