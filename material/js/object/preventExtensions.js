"use strict"

let user = {
  name: 'xx'
}

Object.preventExtensions(user)

user.age = 11
user.name = 555
console.log(user.age, user.name)

Object.freeze(user)
user.age = 666
user.brith = '1992'
console.log(user.age, user.name, user.brith)