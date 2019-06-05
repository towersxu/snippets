package material.algorithm.leetcode;

class Solution {
  public static void main(String[] args) {
    System.out.println(isPalindrome(12314321));
  }
  public static boolean isPalindrome(int x) {
    if (x == 0) {
      return true;
    }
    if (x < 0 || x % 10 == 0) {
      return false;
    }
    int pop = 0;
    while (pop < x) {
      pop = pop * 10 + x % 10;
      x = x / 10;
    }
    if (pop > x && pop / 10 != x) {
      return false;
    }
    return true;
  }
}