// 背包问题
// 0-1 背包问题有很多变体，我这里介绍一种比较基础的。
// 我们有一个背包，背包总的承载重量是 Wkg。
// 现在我们有 n 个物品，每个物品的重量不等，并且不可分割。
// 我们现在期望选择几件物品，装载到背包中。在不超过背包所能装载重量的前提下，如何让背包中物品的总重量最大？

let w = 9
let weight = [2, 2, 4, 6, 2]
let value = [3, 4, 8, 9, 6]
// weight: 物品重量，n: 物品个数，w: 背包可承载重量
function knapsack1 (weight, n, w) {
  let states = [];
  for (let i = 0; i < n; i++) {
    states.push([])
  }
  states[0][0] = true; // 第一行的数据要特殊处理，可以利用哨兵优化
  states[0][weight[0]] = true;
  for (let i = 1; i < n; ++i) { // 动态规划状态转移
    for (let j = 0; j <= w; ++j) {// 不把第 i 个物品放入背包
      if (states[i - 1][j] == true)
        states[i][j] = states[i - 1][j];
    }
    for (let j = 0; j <= w - weight[i]; ++j) {// 把第 i 个物品放入背包
      if (states[i - 1][j] == true)
        states[i][j + weight[i]] = true;
    }
  }
  for (let i = w; i >= 0; --i) { // 输出结果
    if (states[n - 1][i] == true)
      return i;
  }
  return 0;
}

function knapsack (weight, n, w) {
  let states = [];
  states[0] = true;
  states[weight[0]] = true;
  for (let i = 1; i < n; ++i) { // 动态规划
    for (let j = w - weight[i]; j >= 0; --j) {// 把第 i 个物品放入背包
      if (states[j] == true) states[j + weight[i]] = true;
    }
  }
  for (let i = w; i >= 0; --i) { // 输出结果
    if (states[i] == true) return i;
  }
  return 0;
}

function knapsackValue (weight, value, n, w) {
  let states = [];
  for (let i = 0; i < n; i++) {
    states.push([]);
  }
  states[0][0] = 0;
  states[0][weight[0]] = value[0];
  for (let i = 1; i < n; i++) {
    for (let j = 0; j <= w; j++) {
      if (states[i - 1][j] >= 0) { // 不加入背包，当前的价值为前一个物品的价值。
        states[i][j] = states[i - 1][j];
      }
    }
    for (let j = 0; j <= w - weight[i]; j++) { // 背包剩余可装的重量
      if (states[i - 1][j] >= 0) { // 如果前面物品的重量之和（在指定条件下）在可装的重量之内，那么就表示当前物品可以和前一个物品一起装
        let v = states[i - 1][j] + value[i]
        let nv = states[i][j + weight[i]]
        if (!nv || nv < v) {
          states[i][j + weight[i]] = v
        }
      }
    }
  }
  // 找出最大值
  let maxvalue = -1;
  for (let j = 0; j <= w; ++j) {
    if (states[n - 1][j] > maxvalue) {
      maxvalue = states[n - 1][j];
    }
  }
  return maxvalue;
}

function knapsackValue3 (weight, value, n, w) {
  let states = []
  states[0] = 0
  states[weight[0]] = value[0]
  for (let i = 1; i < n; i++) {
    for (let j = w - weight[i]; j >= 0; j--) {
      if (states[j] !== undefined) { // 在原来的基础上增加
        let oldv = states[j + weight[i]]
        let v = states[j] + value[i]
        if (oldv === undefined || oldv < v) {
          states[j + weight[i]] = states[j] + value[i]
        }
      }
    }
  }
  console.log(states)
}

knapsack(weight, weight.length, w)

knapsackValue(weight, value, weight.length, w)
knapsackValue3(weight, value, weight.length, w)