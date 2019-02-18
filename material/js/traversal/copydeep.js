/**
 * 对象深拷贝
 */
let _toString = Object.prototype.toString
let map = {
  array: 'Array',
  object: 'Object',
  function: 'Function',
  string: 'String',
  null: 'Null',
  undefined: 'Undefined',
  boolean: 'Boolean',
  number: 'number'
}
let getType = (item) => {
  return _toString.call(item).slice(8, -1)
}
let isTypeOf = (item, type) => {
  return map[type] && map[type] === getType(item)
}
// 深复制 深度优先遍历
let DFSdeepClone = (obj) => {
  let _obj = {}
  if (isTypeOf(obj, 'array')) {
    _obj = []
  } else if (isTypeOf(obj, 'object')) {
    _obj = {}
  }
  for (item in obj) {
    let val = obj[item]
    if (isTypeOf(val, 'array') || isTypeOf(val, 'object')) {
      _obj[item] = DFSdeepClone(val)
    } else {
      _obj[item] = obj[item]
    }
  }
  return _obj
}
// 广度优先遍历
let BFSdeepClone = (obj) => {
  let origin = [obj]
  let copyObj = {}
  let copy = [copyObj]
  // 去除环状数据
  let visitedQueue = []
  let visitedCopyQueue = []
  while (origin.length > 0) {
    let items = origin.shift()
    // 操作的是当前对象
    let _obj = copy.shift()
    visitedQueue.push(items)
    visitedCopyQueue.push(_obj)
    for (let item in items) {
      let val = items[item]
      if (isTypeOf(val, 'object')) {
        let index = visitedQueue.indexOf(val)
        if (!~index) {
          _obj[item] = {}
          //下次while循环使用给空数组提供数据
          origin.push(val)
          // 推入引用对象
          copy.push(_obj[item])
          visitedQueue.push(val)
        } else {
          // _obj[item] = visitedQueue[index]
          _obj[item] = visitedCopyQueue[index]
        }
      } else if (isTypeOf(val, 'array')) {
        // 数组类型在这里创建了一个空数组
        _obj[item] = []
        //下次while循环使用给空数组提供数据
        origin.push(val)
        // 推入引用对象
        copy.push(_obj[item])
      } else {
        _obj[item] = val
      }
    }
  }
  return copyObj
}
let a = { a: 1, b: 2, c: { d: 3, e: 4 }, f: [1, 2] }
var b = DFSdeepClone(a)
a.c.e = 'a'
a.f[1] = 'a'
console.log(b)
// 广度深递归防止爆栈
const obj1 = {
  foo: {
    name: 'foo',
    bar: {
      name: 'bar',
      baz: {
        name: 'baz',
        aChild: null //待会让它指向obj.foo
      }
    }
  }
}
obj1.foo.bar.baz.aChild = obj1.foo
var c = BFSdeepClone(obj1)
obj1.foo.name = 'foo1'
console.log(c)