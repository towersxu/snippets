var number = 10;
function fn() {
  // console.log(this)
  console.log(this.number);
}
var obj = {
  number: 2,
  show: function (fn) {
    this.number = 3;
    // 这里就是直接执行，在浏览器上this指向window
    // 在node上指向global
    // 在node 10上var并不会绑定到gloabl上，
    // 所以这里也打印undefined
    fn();
    // arguments[0]等同于对象的arguments.0, 
    // 所以这里的fn的this是arguments
    // 所以arguments[0]()是undefined
    arguments[0]();
  }
};
obj.show(fn);

var arr = []

arr.number = 11

arr.push(fn)
arr[0]() // 11