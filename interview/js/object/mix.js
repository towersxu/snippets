// let mix = function (obj) {
//   return {
//     with: function (...args) {
//       return args.reduce(function (obj1, arg) {
//         return Object.create(obj1, Object.getOwnPropertyDescriptors(arg))
//       }, obj)
//     }
//   }
// }
let mix = (obj) => ({
  with: (...args) => args.reduce(
    (obj1, arg) => Object.create(
      obj1, Object.getOwnPropertyDescriptors(arg)
    ), obj)
})


let a = { a: 'a' };
let b = { b: 'b' };
let c = { c: 'c' };
let d = mix(c).with(a, b);
console.log(c)
console.log(d)
console.log(Object.getPrototypeOf(d).a === a.a)
console.log(Object.getPrototypeOf(d) === a)
console.log(d.c) // "c"
console.log(d.b) // "b"
console.log(d.a) // "a"

