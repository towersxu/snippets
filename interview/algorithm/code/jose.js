
/**
 * N个人围成一圈，从第一个开始报数，第M个将被杀掉，最后剩下一个，其余人都将被杀掉。
 * 例如N=6，M=5，被杀掉的顺序是：5，4，6，2，3，1。
 */
let n = 6
let m = 5

let arr = Array.of(...Array(n)).map((i, j) => j)

let r = n; // 剩下的人数
let t = 0; // 当前数到人的序号
while (r > 0) { // 还剩多少个人需要杀死
  let cnt = 0; // 计数，数到m为止
  while (true) { // 开始数
    if (t === n) { // 数到最后一个人，
      t = 0; // 从头数
    }
    if (arr[t] !== undefined) { // 如果这个人还活着，就要数数
      cnt++; // 数出当前的计数
      if (cnt === m) { // 如果是对应的死亡的数
        console.log('第' + (arr[t] + 1) + '个人死了')
        arr[t] = undefined;
        break; // 重新数
      }
    }
    t++;
  }
  r--;
}
