class Person {
  constructor (name) {
    this.name = name
  }
  getName () {
    return this.name
  }
}

function User (name){
  this.user = name;
  this.getName = function () {
    return this.user
  }
}

const p = Reflect.construct(Person, ['xt'])

console.log(p.getName())

Reflect.preventExtensions(p)
p.age = 33
console.log(p)
console.log(Reflect.getOwnPropertyDescriptor(p, 'name'))
