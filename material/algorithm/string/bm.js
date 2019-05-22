// 坏字符规则和好后缀规则
// wtf? 只写了坏字符规则，怎么就所有的用例都能测试通过了？
function indexOf(string, substing) {
  let matchIndex = -1

  let subLength = substing.length
  let subIndex = subLength - 1
  let sIndex = subIndex
  let sLength = string.length
  let subStirngMap = {}
  for (let i = 0; i < subLength; i++) {
    // todo: 直接用对象似乎有问题，如果匹配内容有空格只能的怎么处理？
    // todo: 这里用ascii应该会好点？
    subStirngMap[substing[i]] = i
  }
  let suffix = []
  let prefix = []
  generateGS(substing, substing.length, suffix, prefix)
  let sIndex1 = sIndex
  while (sIndex <= sLength) {
    if (string[sIndex] === substing[subIndex]) {
      if (subIndex === 0) {
        return sIndex
      }
      subIndex--
      sIndex--
    } else {
      let badChar = string[sIndex]
      let xi = subStirngMap[badChar] === undefined ? -1 : subStirngMap[badChar]
      // “坏字符规则”本身不难理解。当遇到坏字符时，要计算往后移动的位数 si-xi，其中 xi 的计算是重点，我们如何求得 xi 呢？或者说，如何查找坏字符在模式串中出现的位置呢？
      // 如果我们拿坏字符，在模式串中顺序遍历查找，这样就会比较低效，势必影响这个算法的性能。有没有更加高效的方式呢？
      // 改成散列表
      // let xi = -1
      // for (let i = substring.length - 1; i >= 0; i--) {
      //   if (substing[i] === badChar) {
      //     xi = i
      //     break
      //   } 
      // }
      let skipLength = substing.length
      if (subIndex > xi) {
        skipLength = subIndex - xi
      } else {
        // 使用好后缀
        // 在模式串中，查找跟好后缀匹配的另一个子串；
        // 在好后缀的后缀子串中，查找最长的、能跟模式串前缀子串匹配的后缀子串；
        skipLength = moveByGS(subIndex, substing.length, suffix, prefix)
      }
      sIndex = sIndex1 + skipLength
      sIndex1 = sIndex
      subIndex = substing.length - 1
    }
  }
  return matchIndex
}

function generateGS(b, m, suffix, prefix) {
  for (let i = 0; i < m; ++i) {
    suffix[i] = -1
    prefix[i] = false
  }
  for (let i = 0; i < m - 1; ++i) {
    let j = i;
    let k = 0;
    while(j >= 0 && b[j] === b[m - 1 - k]) {
      --j;
      ++k;
      suffix[k] = j + 1
    }
    if (j === -1) {
      prefix[k] = true
    }
  }
}

function moveByGS(j, m, suffix, prefix) {
  let k = m - 1 - j;
  if (suffix[k] !== -1) {
    return j - suffix[k] + 1
  }
  for (let r = j + 2; r <= m - 1; ++r) {
    if (prefix[m - r] === true) {
      return r
    }
  }
  return m
}
console.log(indexOf('dddaddaeaaaa', 'adda'))
// console.log(indexOf('aadaaaa', 'adaaa'))
// console.log(indexOf('abcdeffg', 'abcdefg'))
console.log(indexOf('aaaaaaaaaaaaa', 'baaa'))
// console.log(indexOf('证明事实上不是我在现实生活中突然忘了字母是如何', '是'))
// console.log(indexOf('GCTTCTGCTACCTTTTGCGCGCGCGCGGAA', 'CCTTTTGC'))