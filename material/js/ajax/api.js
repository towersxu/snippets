/**
 * 实现类似debounce，但是重复的调用function不会被吞掉，会触发回调。
 * 需求: 在指定时间里面，系统发起了相同的请求，
 * 将这些请求合并，最终只发起一个ajax，但是成功过后所有的调用方都会受到回调。
 */
function debounce1 (fn1, timer) {
  let t
  let fns = {}
  let kv
  return function (fn) {
    if (t) {
      clearTimeout(t)
    } else {
      kv = new Date().getTime()
      fns[kv] = []
    }
    fns[kv].push(fn)
    t = setTimeout(function (k) {
      t = undefined
      let arr = fns[k]
      fn1(function (r) {
        for (let i = arr.length - 1; i >= 0; i--) {
          arr[i].call(this, r)
        }
        arr = undefined
        delete fns[k]
      })
    }, timer, kv)
  }
}

function debounce(inner, ms = 30) {
  let timer = null;
  let resolves = [];

  return function (...args) {
    // Run the function after a certain amount of time
    clearTimeout(timer);
    timer = setTimeout(() => {
      // Get the result of the inner function, then apply it to the resolve function of
      // each promise that has been created since the last time the inner function was run
      let result = inner(...args);
      resolves.forEach(r => r(result));
      resolves = [];
    }, ms);

    return new Promise(r => resolves.push(r));
  };
}

let d = debounce1((fn) => {
  ajax().then(() => {
    fn('success')
  })
}, 20)

function service (i) {
  return new Promise((resolve, reject) => {
    d((r) => {
      resolve(r)
    })
  })
}

// service(4).then((r) => {
//   console.log(11, r)
// })

// service(5).then((r) => {
//   console.log(22, r)
// })

// setTimeout(() => {
//   service(6).then((r) => {
//     console.log(33, r)
//   })
// }, 1000)

function ajax () {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('ajax')
      resolve('ajax success')
    }, 3000)
  })
}

function ajax1 (flag) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('in ajax')
      resolve(`ajax ${flag}`)
    }, 3100)
  })
}

let debounceAjax = debounce(ajax)

debounceAjax('firset').then((data) => {
  console.log(data)
})
debounceAjax('sec').then((data) => {
  console.log(data)
})
setTimeout(() => {
  debounceAjax('third').then((data) => {
    console.log(data)
  })
}, 1000)