function p1 () {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(1)
    }, 1000)
  })
}

function p2() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(2)
    }, 2000)
  })
}

function p3() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(3)
    }, 3000)
  })
}

Promise.all([p1(), p2(), p3()])
.then((r) => {
  console.log('then', r)
})
.catch((r2) => {
  console.log('catch', r2)
})
.finally((res) => {
  console.log(res)
})