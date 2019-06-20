package material.algorithm.leetcode;

class LongestCommonPrefix {
  public static void main(String[] args) {
    String[] s = {"aa", "a"};
    System.out.println(longestCommonPrefix(s));
  }
  public static String longestCommonPrefix(String[] strs) {
    if (strs.length == 0) {
      return "";
    }
    int min = 10000;
    int flag = 0;
    for (int i = 0; i < strs.length; i++) {
      if (strs[i].length() < min) {
        flag = i;
        min = strs[i].length();
      }
    }
    String str = strs[0];
    for (int i = 0; i < min; i++) {
      char c = str.charAt(i);
      for (int j = 1; j < strs.length; j++) {
        if (c != strs[j].charAt(i)) {
          return str.substring(0, i);
        }
      }
    }
    return strs[flag];
  }
}