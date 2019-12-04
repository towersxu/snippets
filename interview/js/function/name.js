var fn = function () {}

console.log(fn.bind().name)

var key = Symbol('desription')

var ob = {
  [key] () {}
}

console.log(ob[key].name)
console.log(key.toString())
console.log(key.discription)