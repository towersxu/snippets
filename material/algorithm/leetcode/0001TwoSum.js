/**
 * leet-code: 1
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function (nums, target) {
  let map = {}
  for (let i = 0; i < nums.length; i++) {
    let key = nums[i]
    let key2 = target - key
    if (map[key2] !== undefined) {
      return [map[key2], i]
    } else {
      map[key] = i
    }
  }
};