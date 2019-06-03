package material.algorithm.leetcode;

class Reverse {
    public static void main(String[] args) throws InterruptedException {
      int n = 1234567890;
      int s = reverse(n);
      System.out.println(s);
    }
    // java最大值2147483647，最小值-2147483648
    public static int reverse (int n) {
      int ret = 0;
      while (n != 0) {
        int pop = n % 10;
        if (ret > 214748364 || (ret == 214748364 && pop > 7)) {
          ret = 0;
          break;
        } else if (ret < -214748364 || (ret == -214748364 && pop < -8)) {
          ret = 0;
          break;
        }
        ret = ret * 10 + pop;
        n = n / 10;
      }
      return ret;
    }
}