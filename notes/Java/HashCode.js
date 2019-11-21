class HashCode {
  hashCode () {
    for (val of this) {
      console.log()
    }
  }
}

class Student extends HashCode {
  constructor (name, age) {
    this.name = name;
    this.age = age;
  }
}

let student1 = new Student('xutao', 28);
let student2 = new Student('xutao', 28);
console.log(student1.hashCode() === student2.hashCode())