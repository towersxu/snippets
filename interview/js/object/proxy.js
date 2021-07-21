const person = observable({
  name: '张三',
  age: 20
});

const person1 = observable({
  name: '王五',
  age: 66
})

function print() {
  console.log(`print: ${this.name}, ${this.age}`)
}
let deps = new Set()
observe(print);
person.name = '李四'; // print: 李四, 20
person.age = '11'; // print: 李四, 11
person1.name = '刘麻子' // print: 刘麻子, 66
function observable(obj) {
  return new Proxy(obj, {
    set (target, name, value, receiver) {
      console.log(JSON.stringify(target), JSON.stringify(receiver))
      let r = Reflect.set(target, name, value, receiver)
      deps.forEach((dep) => {
        Reflect.apply(dep, target, [])
      })
      return r
    },
    get (target, key, receiver) {
      return target[key] + 'xx'
    }
  })
}

function observe (fn) {
  deps.add(fn)
}

// var handlers = {
//   get(target, key, context) {
//     // console.log(context)
//     // console.log(greeter === context); //true, this line added
//     return function () {
//       context.speak(key + "!");
//     };
//   }
// }
// var catchall = new Proxy({}, handlers)
// var greeter = {
//   speak(who = "someone") {
//     console.log("hello", who);
//   }
// };

// // setup `greeter` to fall back to `catchall`
// Object.setPrototypeOf(greeter, catchall);

// greeter.speak();                // hello someone
// greeter.speak("world");       // hello world

// greeter.everyone();             // hello everyone!