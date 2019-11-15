function *getNumber () {
  yield 1
  yield 2
  return 3
}
var g = getNumber()
console.log(g.next())
console.log(g.next())
console.log(g.next())
console.log(g.next())
console.log(getNumber().next())
console.log(getNumber().next())

var g1 = getNumber()

for (i of g1) {
  console.log(i)
}
