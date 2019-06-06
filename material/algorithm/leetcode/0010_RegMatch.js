// todo: 结合动态规划章节看
function isMatch (s, p) {
  var dp = [];
  for (var i = s.length; i >= 0; i--) {
    dp.push([]);
  }
  dp[s.length][p.length] = true;
  for (var i = s.length; i >= 0; i--) {
    
    for (var j = p.length - 1; j >= 0; j--) {
      var first_match = (i < s.length && (p[j] == s[i] || p[j] == '.'));
      if (j + 1 < p.length && p[j + 1] == '*') {
        dp[i][j] = dp[i][j + 2] || first_match && dp[i + 1][j];
      } else {
        dp[i][j] = first_match && dp[i + 1][j + 1];
      }
    }
  }
  return dp[0][0];
}

var s = "abassad";
var p = "a.*d";

console.log(isMatch(s,p));