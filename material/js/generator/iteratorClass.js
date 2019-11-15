class RangeIterator {
  constructor(start, stop) {
    this.value = start;
    this.stop = stop;
  }

  [Symbol.iterator]() { return this; }
  
  next(val) {
    if (val) this.value = val
    var value = this.value;
    if (value < this.stop) {
      this.value++;
      return { done: false, value: value };
    }
    return { done: true, value: undefined };
  }
}

function range(start, stop) {
  return new RangeIterator(start, stop);
}

for (var value of range(0, 3)) {
  console.log(value); // 0, 1, 2
}

var r = range(1, 100)
console.log(r.next())
console.log(r.next())
console.log(r.next(50))
console.log(r.next())