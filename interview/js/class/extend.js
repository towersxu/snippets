class P {
  constructor () {
    this.username = 'xxx'
  }
  getName () {
    return this.username
  }
}

class C extends P {
  constructor () {
    super()
    this.age = 55
  }
  getAge () {
    return this.age
  }
}

let c1 = new C()
let c2 = new C()

let proto = Object.getPrototypeOf(c1)

console.log(proto instanceof P)
console.log(Object.getPrototypeOf(C) === P)

