var area = {
  prvice: 'c',
  city: 'x'
}
var obj = {
  name: 'x',
  getName: function () {
    return this.name
  },
  area: area
}
Object.defineProperty(obj, 'getName', {
  writable: false
  // set: function () {
  //   throw new Error('xx')
  // }
})

Object.defineProperty(obj, 'area', {
  writable: false
})

obj.getName = function () {
  return this.name + 'xx'
}
console.log(obj.getName()) // x -> 说明上面的obj.getName = function () {} 没有生效

console.log(obj.area.prvice) // c

obj.area.prvice = 'xxx'

console.log(obj.area.prvice) // xxx -> 说明设置一个属性不可写，但是如果属性的值是对象，可以对这个对象进行修改。

obj.area = {
  prvice: 'c1',
  city: 'x1'
}

console.log(obj.area.prvice) // xxx -> 但是不能对这个属性进行重新赋值新对象。