function Parent(name) {
  this.name = name
}

let p = new Parent('xxx')

Child.prototype = p

function Child (time, age) {
  this.age = age
  this.time = time
  Reflect.set(this, Symbol(), 'sss')
  this[Symbol()] = 'xxx'
}

let c = new Child('xt', 11)

Object.defineProperty(c, 'time', {
  enumerable: false
})

let keys = Object.keys(c)
console.log(keys) // 获取对象上正常的属性
console.log(Object.getOwnPropertyNames(c)) // 还可以获取不可迭代属性，既enumerable无false的属性
console.log(Reflect.ownKeys(c)) // 处理可以获取不可迭代属性，还可以获取Symbol属性
for (let a in c) { // 可以获取原型属性，但是不可获取不可迭代和Symbol对象。但是无法获取不可迭代属性和Symbol属性
  console.log(a)
}

let syb = Symbol()

c.syb = '333' // Symbol不能用.运算符，可以用方括号或者Reflect
c[syb] = '444'
console.log(c.syb, c[syb]) // 333, 444
