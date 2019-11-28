# 如何手动实现一个Promise的polyfill

在面试中问道这个问题其实并不是需要你完全写出来，只需要描述清楚实现Promise polyfill的关键点即可。

1）首先Promise实现Promise的构造函数框架，一个名字为Promise构造函数,这个构造函数的原型对象带有`then`,`catch`方法，这个构造函数本身也有`resolve`,`reject`,`all`等方法

```js

function Promise(exec) {
  var self = this;
  self.status = 'pending';
  self.onResolvedCallback = [];
  function resolve () {}

  function reject () {}

  exec(resolve, reject);
}
Promise.resolve = function () {}
Promise.reject = function () {}
Promise.all = function () {}

Promise.prototype.then = function () {}
Promise.prototype.catch = function () {}

```

2）promise里面的异步函数执行完成后，需要调用resolve, 我们在resolve方法里面。将promise对象状态设置为fulfilled。并且调用当前需要执行的then队列。

```js
function resolve(value) {
  setTimeout(()=>{
    if(self.status === 'pending'){ // if 判断, 让它只执行1次
      self.status = 'resolved';
      self.data = value;
      self.onResolvedCallback.forEach(item=>item(value));
    }
  });
}
```

3）回调函数是什么时候加入onResolvedCallback的呢？在then被调用的时候。

如果当前是pending状态，返回一个新的promise对象，
在调用构造函数的时候，传递一个方法，这个方法里面添加执行onResolved的函数。
这里因为是返回的新的promise对象，保证了promise关键的链式调用。

```js
Promise.prototype.then = function (onResolved, onRejected) {
  var self = this;
  
  onResolved = typeof onResolved === 'function' ? onResolved : function(v){ return v};

  if(self.status === 'pending'){
    return new Promise(function(resolve, reject){
      self.onResolvedCallback.push(function(value){
        try{
          var x = onResolved(value);
          if(x instanceof Promise){
              x.then(resolve, reject);
          }else{
            resolve(x);
          }
        }catch(e){
          reject(x);
        }
      });
    });
  }
  if(self.status === 'fulfilled'){
    return new Promise(function(resolve, reject){
        try{
            var x = onResolved(self.data);
            if(x instanceof Promise){
                x.then(resolve, reject);
            }else{
                resolve(x);
            }
        }catch(e){
            reject(x);
        }
    });
  }
}
```
