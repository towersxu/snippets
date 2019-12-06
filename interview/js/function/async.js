async function getUser () {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(1)
      resolve(1000)
    }, 1000)
  })
}

async function getAge() {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(3)
      resolve(3000)
    }, 3000)
  })
}

async function getAll () {
  let d = new Date().getTime()
  let age = getAge()
  let use = getUser()
  // let r = await Promise.all([age, use])
  let r1 = await age;
  let r2 = await age;
  console.log(r1, r2)
  console.log(new Date().getTime() - d)
}

getAll()