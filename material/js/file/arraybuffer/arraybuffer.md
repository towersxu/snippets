# arraybuffer

ArrayBuffer 对象用来表示通用的、固定长度的原始二进制数据缓冲区。ArrayBuffer 不能直接操作，而是要通过类型数组对象或 DataView 对象来操作，它们会将缓冲区中的数据表示为特定的格式，并通过这些格式来读写缓冲区的内容。

## arraybuffer与array的区别

arraybuffer是一个存储原始二级制数据的数组。可以用来在直接操作内存，而且更加的节省内存空间。

## arraybuffer的实际应用场景

### webassembly中js与wasm交换数据

```c++
int g_int = 42;
double g_double = 3.1415926;

EM_PORT_API(int *)
get_int_ptr()
{
  return &g_int;
}

```

```js
var int_ptr = Module._get_int_ptr();
  console.log(int_ptr) // 地址
// Module.HEAP32: 根据地址获取值。
// 等同于new Int32Array(buffer)
// 表示一个开辟的内存空间
// int_ptr >> 2; 右移动两位是因为buffer被转换成Int32Array,
// 表示每个元素占用4字节(一个字节8位)。所以除以4.除以4表示向右移两位
var int_value = Module.HEAP32[int_ptr >> 2]
  console.log(int_value) // 42
```

下面是webassembly胶水代码的示例代码，可以发现，C++中声明的变量，最终在wasm文件运行后，可以通过WebAssembly.Memory从内存中获取，也是就是buffer，是ArrayBuffer类型。然后使用Int32Array将其转换为32位整形。然后就可以直接当做数组访问了。

```js

function getBinaryPromise() {
  return fetch(wasmBinaryFile, { credentials: 'same-origin' }).then(function(response) {
    if (!response['ok']) {
      throw "failed to load wasm binary file at '" + wasmBinaryFile + "'";
    }
    return response['arrayBuffer']();
  })
}

getBinaryPromise().then(function(binary) {
  return WebAssembly.instantiate(binary, info);
})

wasmMemory = new WebAssembly.Memory({
  'initial': INITIAL_TOTAL_MEMORY / WASM_PAGE_SIZE
  ,
  'maximum': INITIAL_TOTAL_MEMORY / WASM_PAGE_SIZE
});
var buffer = wasmMemory.buffer;
Module['HEAP32'] = HEAP32 = new Int32Array(buffer);

```
