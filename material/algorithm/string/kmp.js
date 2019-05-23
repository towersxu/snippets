function kmp (mainStr, matchStr) {
  let n = mainStr.length
  let m = matchStr.length
  let next = getNexts(matchStr, m)
  let j = 0
  for (let i = 0; i < n; ++i) {
    while(j > 0 && mainStr[i] !== matchStr[j]) {
      j = next[j - 1] + 1;
    }
    if (mainStr[i] === matchStr[j]) {
      ++j
    }
    if (j === m) {
      return i - m + 1
    }
  }
  return -1
}

function getNexts (matchStr, m) {
  let next = []
  next[0] = -1
  let k = -1
  for (let i = 1; i < m; ++i) {
    while (k !== -1 && matchStr[k + 1] !== matchStr[i]) {
      k = next[k]
    }
    if (matchStr[k + 1] === matchStr[i]) {
      ++k
    }
    next[i] = k
  }
  return next
}

console.log(kmp('ababaeabac', 'ababacd'))
// console.log(kmp('dddaddaeaaaa', 'adda'))
// console.log(kmp('aadaaaa', 'adaaa'))
// console.log(kmp('abcdeffg', 'abcdefg'))
// console.log(kmp('aaaaaaaaaaaaa', 'baaa'))
// console.log(indexOf('证明事实上不是我在现实生活中突然忘了字母是如何', '是'))
// console.log(indexOf('GCTTCTGCTACCTTTTGCGCGCGCGCGGAA', 'CCTTTTGC'))