package material.algorithm.leetcode;

class Atoi {
  public static void main (String[] args) {
    String a = "-2147483647";
    int i = myAtoi(a);
    System.out.println(i);
  }
  
  public static int myAtoi(String str) {
    int len = str.length();
    int n = 0;
    Boolean isMinus = false;
    int i = 0;
    for (; i < len; i++) {
      char c = str.charAt(i);
      if (c - '0' != -16) {
        if (c == '-') { isMinus = true; i++; }
        if (c == '+') { i++; }
        break;
      }
    }
    for (; i < len; i++) {
      char c = str.charAt(i);
      int j = c - '0';
      if (j < 10 && j >= 0) {
        if (n > 214748364 || (n == 214748364 && j > 7)) {
          n = Integer.MAX_VALUE;
          break;
        } else if (n < -214748364 || (n == -214748364 && j > 8)) {
          n = Integer.MIN_VALUE;
          break;
        }
        if (isMinus) {
          n = n * 10 - j;
        } else {
          n = n * 10 + j;
        }
      } else {
        break;
      }
    }
    return n;
  }
}
