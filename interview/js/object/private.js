let syb =  Symbol()
class PersonProtected {
  constructor(name) {
    this._private = name;
    return new Proxy(this, {
      get(target, name) {
        console.log(target, name)
        if (name.startsWith('_')) {
          throw new Error('Accessing to a private property is not allowed');
        } else {
          return target[name];
        }
      }
    });
  }
  get name() {
    return this._private
  }
  set name(name) {
    this._private = name;
  }
  greeting(person) {
    return `hi ${person.name}`;
  }
  _addFirst(x) {
    this._name = `${x} ${this._name}`
  }
}

let ivanPersonProtectedInstance = new PersonProtected('Ivan');

console.log(ivanPersonProtectedInstance.greeting(ivanPersonProtectedInstance))
// console.log(ivanPersonProtectedInstance._name)
// ivanPersonProtectedInstance._addFirst('miss')