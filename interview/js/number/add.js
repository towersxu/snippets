var obj = {
  value: '11',
  valueOf: function () {
    return this.value
  }
}

console.log(1 + obj)

console.log([] + {} === {} + [])
console.log([] + {})
console.log({} + [])
console.log([1,2] + 2)
console.log(1 + {})
console.log({} + 1)
console.log([1,2] + 1)
console.log(1 + [1,2])