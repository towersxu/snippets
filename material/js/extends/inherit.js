/**
 * 这种方式，既公用了原型，又实现了修改子对象的属性的时候不会修改原型对象
 * @param {function} Child 
 * @param {function} Parent 
 */

function inherit(Child, Parent) {
  Parent.prototype.constructor = Parent;
  Child.prototype = new Parent();
  Child.prototype.constructor = Child;

  return Child;
}

function A() {
  this.name = 'A'
  this.age = 2
}

function B() {
  this.name = 'B'
  this.type = 'B'
}
let C = inherit(B, A)

let c = new C()
let c1 = new C()

console.log(c.__proto__ === c1.__proto__) // true
c.age = 3
console.log(c1.age) // 2

