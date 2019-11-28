function a({ data: d = 33} = {}) {
  console.log(d)
}

a()

let arr = [1, 2, 3, 4, 5, 6, 7]

let [, ...b] = arr;

console.log(b)

let obj = { a1: 1, b1: {x: 1}, c1: 3, d1: 4}

let {a1: first, ...other} = obj

console.log(first)
console.log(other)

other.b1.x = 222
console.log(obj.b1.x)

let string = 'hello world';

let [, ...res] = string
console.log(res)

let a2;

[(a2), a3] =[11, 2];

console.log(a2)

let map = new Map()

map.set(12, 11)
map.set(Symbol(), 12)
map.set(Symbol(), 13)
map.set(14, 13)

for (let [key, val] of map) {
  console.log(key, val)
}
