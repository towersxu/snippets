// 应该是 1 元、 5 元、 16 元、 23 元、 33 元这五种
// 1, 5, 10, 20, 50
// 1-99
// 计算出平均花费的钱
// var money = [50, 20, 10, 5, 1];
var money = [33, 23, 16, 5, 1];
var total = 0;
for (var i = 1; i < 100; i++) {
  var current = i;
  var combin = [];
  while (current) {
    for (var j = 0; j < money.length; j++) {
      var m = money[j];
      if (current >= m) {
        var num = Math.floor(current / m);
        combin.push(m + '*' + num);
        total += num;
      }
      current = current % m;
    }
  }
  console.log(i, combin)
}
console.log(total / 99)