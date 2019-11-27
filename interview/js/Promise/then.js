// let p = new Promise((resolve) => {
//   resolve(33)
// })

// p.then(r => {
//   console.log('r1', r)
// })

// p.then(r => {
//   console.log('r2', r)
// })

setTimeout(function () {
  console.log(1)
}, 0);

let r = Promise.resolve(function () {
  console.log(2)
})

// r.then(r1 => {
//   r1()
// })

new Promise(function (resolve, reject) {
  console.log(3)
  resolve(4)
}).then(r => {
  console.log(r)
})

console.log(5)