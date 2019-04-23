/**
 * 时间复杂度为logN示例
 * @param {number} n 
 */
function getLogN (n) {
  let i = 1
  let t = 0
  while (i < n) {
    i = i * 2
    t++
  }
  return t
}
console.log(getLogN(16))