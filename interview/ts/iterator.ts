// interface Iterable {
//   [Symbol.iterator](): Iterator
// }

// interface Iterator {
//   next(value?: any): IterationResult,
// }

// interface IterationResult {
//   value: any,
//   done: boolean,
// }
let j = 0;
let user = {
  i: 0,
  *[Symbol.iterator] () {
    return {
      next: () => {
        if (j === 4) {
          console.log(this.i)
          return {
            value: 0,
            done: true
          }
        }
        j++
        this.i++
        return {
          value: 1,
          done: false
        };
      }
    };
  }
}

