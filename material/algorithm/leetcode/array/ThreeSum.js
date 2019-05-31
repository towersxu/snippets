/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function (nums) {
  let result = []
  let pre
  for (let i = 0; i < nums.length - 2; i++) {
    let current = nums[i];
    if (current === undefined) {
      break
    }
    // 查找后面两数之和等于current的值
    for (let j = i + 1; j < nums.length - 1; j++) {
      let next = nums[j]
      if (next !== undefined && next === pre) {
        nums[j] = undefined
        break
      }
      for (let k = j + 1; k < nums.length; k++) {
        let third = nums[k]
        if (third !== undefined && pre === third) {
          nums[k] = undefined
          break
        }
        if (current + next + third === 0) {
          result.push([current, next, third])
          pre = third
        }
      }
    }
  }
  return result
};

var r = threeSum([-1, 0, 1, 0, 1, 1, 1, 0]);
console.log(r)