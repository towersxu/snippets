var obj = {
  age: 0,
  [Symbol.iterator]() {
    return {
      next: () => {
        if (this.age < 3) {
          this.age++
          return { value: this.age }
        }
        return { done: true }
      }
    }
  }
}

console.log([...obj])
// for (i of obj) {
//   console.log(i)
// }