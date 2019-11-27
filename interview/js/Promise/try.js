const f = () => {
  console.log(2);
  return 2;
}

const f1 = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(3)
      resolve(3)
    }, 1000)
  })
}

// 写法问题，不论f是同步还是异步，f都是在打印next后执行。
// Promise.resolve().then(f);
// console.log('next');

// 现在希望f是同步的则在next打印之前执行。

// (async () => f())()
// .then(() => {console.log(333)})
// .catch(() => {})
// console.log('next');

(new Promise((resolve) => {
  resolve(f1())
})).then(() => {
  console.log(333)
})
console.log('next')

// Promise.try(f1)
// console.log('next')