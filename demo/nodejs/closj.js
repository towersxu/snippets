function out() {
  const bigData = new Buffer(100);
  inner = function () {
    void bigData;
  }
}

setInterval(() => {
  out()
}, 1000)