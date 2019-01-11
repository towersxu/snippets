function getData1 () {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(1)
    }, 3000)
  })
}

function getData2 () {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(2)
    }, 2000);
  })
}

function getData3 () {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(3)
    }, 500)
  })
}

async function loadData() {
  let r = await getData1()
  console.log('loadData', r)
  let r1 = await getData2()
  console.log('loadData', r1)
  let r2 = await getData3()
  console.log('loadData', r2)
}

loadData()

async function loadData1() {
  let fn1 = getData1()
  let fn2 = getData2()
  let r = await fn1
  console.log('loadData1', r)
  let r1 = await fn2
  console.log('loadData1', r1)
  let r2 = await getData3()
  console.log('loadData1', r2)
}

loadData1()