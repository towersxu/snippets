// 给定一个字符串 s，找到 s 中最长的回文子串。你可以假设 s 的最大长度为 1000。
var longestPalindrome = function (s) {
  // Manacher算法？？？
  let t = '$#'
  for (let i = 0; i < s.length; i++) {
    t+= s[i] + '#'
  }
  /******************/
  let rightIndex = 0;
  let centerIndex = 0;
  //求len中的最大
  let answer = 0;
  //answer最大时的中心
  let index = 0;
  let len = []
  // $#c#s#a#s#s#a#s#d#f#a#s#a#f#d#s#d#
  for (let i = 1; i < t.length; i++) {
    if (rightIndex > i) {
      len[i] = Math.min(rightIndex - i, len[2 * centerIndex - i]);
    } else {
      len[i] = 1;
    }
    while (t[i - len[i]] == t[i + len[i]]) {
      len[i]++;
    }
    if (len[i] + i > rightIndex) {
      rightIndex = len[i] + i;
      centerIndex = i;
    }
    if (len[i] > answer) {
      answer = len[i];
      index = i;
    }
  }
  return s.substr((index - answer) / 2, answer - 1);
};
// var longestPalindrome = function (s) {
//   if (s == null || s.length < 1) return "";
//   var start = 0, end = 0;
//   for (var i = 0; i < s.length; i++) {
//     var len1 = expandAroundCenter(s, i, i);
//     var len2 = expandAroundCenter(s, i, i + 1);
//     var len = Math.max(len1, len2);
//     if (len > end - start) {
//       start = i - Math.floor((len - 1) / 2)
//       end = i + Math.floor(len / 2);
//     }
//   }
//   return s.substring(start, end + 1);
// }
// function expandAroundCenter(s, left, right) {
//   var L = left, R = right;
//   while (L >= 0 && R < s.length && s[L] == s[R]) {
//     L--;
//     R++;
//   }
//   return R - L - 1;
// }

console.log(longestPalindrome('aaaaaav'))