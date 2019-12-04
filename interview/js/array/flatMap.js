let arr = [
  1,
  [2, 3],
  [4, 5, [6, 7]]
]

var r = arr.flatMap(function (current, index, array) { 
  if (Array.isArray(current)) {
    current = current.flatMap((val) => val * 2)
  }
  return current * 2
})
console.log(r)