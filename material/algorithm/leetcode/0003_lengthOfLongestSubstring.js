/**
 * @param {string} s
 * @return {number}
 * 给定一个字符串，请你找出其中不含有重复字符的 最长子串 的长度。
 */
var lengthOfLongestSubstring = function (s) {
  let length = 0
  let maxMap = {}
  let maxLength = 0
  let start = 0
  for (let i = 0; i < s.length; i++) {
    let c = s[i]
    let j = maxMap[c]
    // 和字符串匹配规则有一定的相似点，使用start记录当前不重复的字符串开始位置
    // 在遍历这个字符的时候，如果之前已经存在，判断这个字符是否在start之后，如果
    // 是，则更新start的位置为当前位置。在遍历完成后，最大的长度就是这个子字符了。
    if ( j !== undefined && j >= start) {
      length = i - j
      start = j
    } else {
      length++
    }
    if (length > maxLength) {
      maxLength = length
    }
    maxMap[c] = i
  }
  return maxLength
};

// lengthOfLongestSubstring('abcabcbb')
// lengthOfLongestSubstring('bbbbb')
// lengthOfLongestSubstring('pwwkew')
lengthOfLongestSubstring('tmmzuxt')