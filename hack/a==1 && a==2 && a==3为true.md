#  (a==1 && a==2 && a==3)执行结果为true

https://theanubhav.com/2018/11/7/understanding-primitive-and-getter-setters/

```js
const a = { value : 0 };
a.valueOf = function() {
    return this.value += 1;
};

console.log(a==1 && a==2 && a==3); //true
```