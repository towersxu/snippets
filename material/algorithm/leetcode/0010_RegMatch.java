package material.algorithm.leetcode;

class RegMatch {
  public static void main(String[] args) {
    String s = "abassad";
    String p = "a.*d";
    System.out.println(isMatch(s, p));
  }
  public static boolean isMatch(String s, String p) {
    boolean[][] dp = new boolean[s.length() + 1][p.length() + 1];
    dp[s.length()][p.length()] = true;

    for (int i = s.length(); i >= 0; i--){
        for (int j = p.length() - 1; j >= 0; j--){
            boolean first_match = (i < s.length() &&
                                    (p.charAt(j) == s.charAt(i) ||
                                    p.charAt(j) == '.'));
            if (j + 1 < p.length() && p.charAt(j+1) == '*'){
                dp[i][j] = dp[i][j+2] || first_match && dp[i+1][j];
            } else {
                dp[i][j] = first_match && dp[i+1][j+1];
            }
        }
    }
    return dp[0][0];
  }
  // 回溯->重叠子问题->动态规划
  // public boolean isMatch(String s, String p) {
  //   if (p.isEmpty()) {
  //     return s.isEmpty();
  //   }
  //   Boolean first_match = (!s.isEmpty() && (p.charAt(0) == s.charAt(0) || p.charAt(0) == '.'));
  //   if (p.length() >= 2 && p.charAt(1) == '*') {
  //     return isMatch(s, p.substring(2)) || (first_match && isMatch(s.substring(1), p));
  //   } else {
  //     return first_match && isMatch(s.substring(1), p.substring(1));
  //   }
  // }
}