// 下面这段代码打印的值是多少
// var a = 9
// function* bar() {
//   a = yield 4
//   yield a + (yield 5) + a
// }
// var it = bar()
// console.log(it.next(1).value)
// console.log(it.next(2).value)
// a = 10
// console.log(it.next(3).value)

var a = 9
function* bar() {
  a = yield 4
  var b = a + (yield 5) + a
  return b;
}
var it = bar()
console.log(it.next(1).value)
console.log(it.next(2).value)
a = 10
console.log(it.next(3))