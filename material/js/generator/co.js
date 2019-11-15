var co = require('co');

var gen = function* () {
  var f1 = yield readFile('/etc/fstab');
  var f2 = yield readFile('/etc/shells');
  console.log(f1);
  console.log(f2);
};

co(gen).then(function () {
  console.log('Generator 函数执行完成');
});

function readFile(path) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(path)
      resolve(path)
    }, 3000)
  })
}