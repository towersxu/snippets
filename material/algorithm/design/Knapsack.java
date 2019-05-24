package material.algorithm.design;

public class Knapsack {
  public static void main(String[] args) {
    int[] weight = { 2, 2, 4, 6, 2 };
    int[] value = { 3, 4, 8, 9, 6 };
    int n = 5;
    int w = 9;
    Knapsack xa = new Knapsack();
    int ret = xa.knapsack(weight, n, w);
    System.out.println(ret);
    int ret1 = xa.knapsack3(weight, value, n, w);
    System.out.println(ret1);
  }
  // weight: 物品重量，n: 物品个数，w: 背包可承载重量
  public int knapsack(int[] weight, int n, int w) {
    boolean[][] states = new boolean[n][w + 1]; // 默认值 false
    states[0][0] = true; // 第一行的数据要特殊处理，可以利用哨兵优化
    states[0][weight[0]] = true;
    for (int i = 1; i < n; ++i) { // 动态规划状态转移
      for (int j = 0; j <= w; ++j) {// 不把第 i 个物品放入背包
        if (states[i - 1][j] == true)
          states[i][j] = states[i - 1][j];
      }
      for (int j = 0; j <= w - weight[i]; ++j) {// 把第 i 个物品放入背包
        if (states[i - 1][j] == true)
          states[i][j + weight[i]] = true;
      }
    }
    for (int i = w; i >= 0; --i) { // 输出结果
      if (states[n - 1][i] == true)
        return i;
    }
    return 0;
  }

  public int knapsack3(int[] weight, int[] value, int n, int w) {
    int[][] states = new int[n][w + 1];
    for (int i = 0; i < n; ++i) { // 初始化 states
      for (int j = 0; j < w + 1; ++j) {
        states[i][j] = -1;
      }
    }
    states[0][0] = 0;
    states[0][weight[0]] = value[0];
    for (int i = 1; i < n; ++i) { // 动态规划，状态转移
      for (int j = 0; j <= w; ++j) { // 不选择第 i 个物品
        if (states[i - 1][j] >= 0)
          states[i][j] = states[i - 1][j];
      }
      for (int j = 0; j <= w - weight[i]; ++j) { // 选择第 i 个物品
        if (states[i - 1][j] >= 0) {
          int v = states[i - 1][j] + value[i];
          if (v > states[i][j + weight[i]]) {
            states[i][j + weight[i]] = v;
          }
        }
      }
    }
    // 找出最大值
    int maxvalue = -1;
    for (int j = 0; j <= w; ++j) {
      if (states[n - 1][j] > maxvalue)
        maxvalue = states[n - 1][j];
    }
    return maxvalue;
  }

}

