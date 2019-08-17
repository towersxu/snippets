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
console.log(obj.getName()) // x

console.log(obj.area.prvice) // c

obj.area.prvice = 'xxx'

console.log(obj.area.prvice) // xxx

obj.area = {
  prvice: 'c1',
  city: 'x1'
}

console.log(obj.area.prvice) // xxx