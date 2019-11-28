
let syn = Symbol()

class P {
  [syn] () {
    console.log(222)
  }
  getName () {
    this[syn]()
  }
}


let p1 = new P()
let p2 = new P()

console.log(Object.is(p1, p2))