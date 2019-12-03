var curry = function (a) {
  // aaa
  return function te (b) {
    return a + b
  }
}
var addThree = curry(3);
addThree(4);

console.log(curry.toString())

Number.prototype[Symbol.iterator] = function* () {
  let i = 0;
  let num = this.valueOf();
  while (i <= num) {
    yield i++;
  }
}

console.log([...7])