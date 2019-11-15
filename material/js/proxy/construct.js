

class User {
  constructor (name) {
    this.name = name
  }
}

let Student = new Proxy(User, {
  construct: function (target, args) {
    return {
      name: 'Grade 1 ' + args[0]
    }
  }
})

class Student1 extends User {
  constructor (name, grades) {
    super(name)
    this.grades = grades
    this.type = 'student'
  }
}

let s = new Student('xt', '1年级')
let s1 = new Student1('xt', '1年级')
console.log(s)
console.log(s instanceof User)
console.log(s1 instanceof User)

