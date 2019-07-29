# webassembly

安装emscripten的坑

直接按照文档安装有问题，后来在mac上把默认的python改成python3才解决。

中途又遇到各种安装一般就是吧，网络问题，已经翻墙了。这里是失败了又安装，重复安装了5，6次才安装好。

还有需要把emcc配置到环境变量中，不然关了terminal又不能用了。

## C与js交互

### 函数导出宏

__EMSCRIPTEN__宏用于探测是否是Emscripten环境

__cplusplus用于探测是否C++环境

EMSCRIPTEN_KEEPALIVE是Emscripten特有的宏，用于告知编译器后续函数在优化时必须保留，并且该函数将被导出至JavaScript

### C如何调用JS方法

第一种方法：

采用编译时将js库注入c的方法.首先在c声明js中的方法，如`EM_PORT_API(int) js_add(int a, int b)`, 然后在js中，通过`mergeInto(LibraryManager.library, {})`将对象增加方法js_add. 在C其他地方代码就可以直接调用js_add方法。最后通过emcc命令`emcc capi_js.cc --js-library pkg.js -o capi_js.js` .优点：使用JavaScript函数注入可以保持C代码的纯净——既C代码中不包含任何JavaScript的成分；缺点：该方法需要额外创建一个.js库文件，维护略为麻烦。（注意，js_add是js代码，所以里面可以调用所有其他js方法。）

第二种方法：

c文件中直接编写js代码，使用`EM_ASM`,`emscripten_run_script`, `emscripten_run_script_int`等emscripten.h中定义的方法，直接执行js字符串。类似于js中的eval.

### js如何调用c中的方法

首先，c被编译成wasm,在胶水js代码中会在js加载后自动去加载wasm文件。在js中，Module对象的`Module.onRuntimeInitialized=function() {}`会在wasm加载完成后触发，在函数里面就可以和C进行交互。c中的方法会在js中会成功可以通过Module对象带有下划线的方法名直接调用。

c返回的内容可能是个地址，js可以通过`Module.HEAPX`方法访问c内存。C/C++代码眼中的内存空间实际上对应的都是Emscripten提供的ArrayBuffer对象.`Module.HEAP32[int_ptr >> 2]`向右移动两位是因为一个元素占用8个字节。32位表示占用4 * 8 字节。右移动两位等于除以4.另外注意，js在获取数据后，可能需要手动把这块内存释放掉。

如果c中的方法接收的是一个地址指针，那么js可以通过`Module._malloc`来开辟内存，然后使用`Module.HEAP32`将要传入的数据写入内存。最后调用的时候，把地址传递给C中的方法即可。（注意，似乎没有C调用js代码，接受js代码返回数组、对象之类的。或者说，这里必须要js在函数中，返回一个地址，不能像之前那样返回引用类型。）

因为js调用c传递非number类型的时候需要如下步骤：

1.使用Module._malloc()在Module堆中分配内存，获取地址ptr；
2.将字符串/数组等数据拷入内存的ptr处；
3.将ptr作为参数，调用C/C++函数进行处理；
4.使用Module._free()释放ptr。

由此可见调用过程相当繁琐，所以emsripten提供了ccall/cwrap方法对齐进行简化处理。

*ccall* `var result = Module.ccall(ident, returnType, argTypes, args);`

参数：

- ident ：C导出函数的函数名（不含“_”下划线前缀）；
- returnType ：C导出函数的返回值类型，可以为'boolean'、'number'、'string'、'null'，分别表示函数返回值为布尔值、数值、字符串、无返回值；
- argTypes ：C导出函数的参数类型的数组。参数类型可以为'number'、'string'、'array'，分别代表数值、字符串、数组；
- args ：参数数组。

*cwrap* `var func = Module.cwrap(ident, returnType, argTypes);`

参数：

- ident ：C导出函数的函数名（不含“_”下划线前缀）；
- returnType ：C导出函数的返回值类型，可以为'boolean'、'number'、'string'、'null'，分别表示函数返回值为布尔值、数值、字符串、无返回值；
- argTypes ：C导出函数的参数类型的数组。参数类型可以为'number'、'string'、'array'，分别代表数值、字符串、数组；

ccall/cwrap潜在风险

虽然ccall/cwrap可以简化字符串参数的交换，但这种便利性是有代价的：当输入参数类型为'string'/'array'时，ccall/cwrap在C环境的栈上分配了相应的空间，并将数据拷入了其中，然后调用相应的导出函数。

相对于堆来说，栈空间是很稀缺的资源，因此使用ccall/cwrap时需要格外注意传入的字符串/数组的大小，避免爆栈。

> Q: 为什么选择在栈上分配呢？是为了方便内存回收？

## Emscripten运行时

### main函数与生命周期

通常情况下，就算是c中的main函数执行完成后，在js中仍然可以调用c中的函数。但是如果在编译的时候，加上参数NO_EXIT_RUNTIME=0,则会在main函数执行完成之后，无法调用C中的其他函数了。
