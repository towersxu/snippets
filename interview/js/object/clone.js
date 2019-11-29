var syc = Symbol();
var o = {
  name: 1,
  [syc] () {
    console.log(444)
  },
  set Age (val) {
    console.log(val)
  },
  get Age () {
    return 111
  },
  get Time () {
    return 3333
  },
  cime: 'xx1'
}

Object.defineProperty(o, 'cime', {
  value: 'xx',
  enumerable: false
})
console.log(Object.entries(o));
console.log(Reflect.ownKeys(o));
var o1 = {
  axs: 2
}

var o2 = {
  csx: 3
}
Object.setPrototypeOf(o, o1)
Object.setPrototypeOf(o1, o2)
var c1 = Object.assign({}, o);
// console.log(c1)
// console.log(Object.getPrototypeOf(o))
for(let a in o ){
  // console.log(a)
}

const merge = (...sources) => Object.assign({}, ...sources);

var c2 = merge(o, o1, o2)
// console.log(c2)

// for(let x of Object.keys(o)) {
//   console.log(x)
// }

// let r = Object.defineProperties({}, Object.getOwnPropertyDescriptors(o));
// console.log(r, r.cime, r.axs)

// let r2 = Object.create(
//   Object.getPrototypeOf(o),
//   Object.getOwnPropertyDescriptors(o)
// );

// console.log(r2, r2.cime, r2.axs)