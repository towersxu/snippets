new Promise((resolve, reject) => {
  resolve(0)
})
.then(r => {
  console.log(r)
})
.then(r => {
  console.log(r)
  return Promise.resolve(3)
})
.then(r => {
  console.log(r)
  throw new Error(4)
  return Promise.resolve(4)
})
.then(r => {
  console.log(r)
  return Promise.reject(5)
})
.then(r => {
  console.log(r)
  return 7
}, e => {
  console.log('err1', e)
})
.then(r => {
  console.log(5555)
})
.catch(e => {
  console.log('err ', e)
  return 1111
})
.then(r => {
  console.log(r, 666)
})
// .catch(r => {
//   console.log(r, 77)
// })
setTimeout(function () {
  console.log(444)
}, 3000)