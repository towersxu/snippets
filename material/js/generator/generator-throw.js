// generator throw

let i = 0
function * getFood () {
  while (true) {
    try {
      yield i++
    } catch (e) {
      i = 0
      yield i++
    }
  }
}

let f = getFood()
console.log(f)
f.next(11)
f.next()
console.log(f.next())
console.log(f.throw())
console.log(f.next())