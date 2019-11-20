function Dog (name) {
  this.name = name
}

function main () {
  var dog = new Dog('dog1')
  func(dog)
  console.log(dog.name); // dog1
}

function func (dog) {
  console.log(dog.name); // dog1
  dog = new Dog('dog2');
  console.log(dog.name); // dog2
}
main()