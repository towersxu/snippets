let user = {
  name: 'xutao',
  age: 28,
  birth: '19910202',
  [Symbol.iterator]: function () {
    return {
      next: () => {
        if (!this._idx) {
          this._idx = 'age'
          return {
            value: this.name,
            done: false
          }
        }
        if (this._idx === 'done') {
          return {
            value: null,
            done: true
          }
        }
        let value = Reflect.get(this, this._idx)

        if (this._idx === 'age')  {
          this._idx = 'birth'
        } else if (this._idx === 'birth') {
          this._idx = 'done'
        }
        return {
          value: value,
          done: false
        }
      }
    }
  }
}

for (attr of user) {
  console.log(attr)
}

let myIterable = {
  name: 'xut',
  age: '222',
  number: 1234,
  [Symbol.iterator]: function* () {
    yield this.name;
    yield this.age;
    yield this.number;
  }
}
console.log([...myIterable]) // [1, 2, 3]
for (attr of myIterable) {
  console.log(attr)
}