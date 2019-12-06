function * gen() {
  yield 20
  yield [1, 2, 3]
  yield getUser()
}

function getUser () {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(10)
    }, 3000)
  })
}
console.log([...gen()])