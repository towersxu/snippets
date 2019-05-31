/**
 * 给定两个大小为 m 和 n 的有序数组 nums1 和 nums2。
  请你找出这两个有序数组的中位数，并且要求算法的时间复杂度为 O(log(m + n))。
  你可以假设 nums1 和 nums2 不会同时为空。
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
// 首先想到的是在两个数组中依次按照大小取值，当取到数量为两个数组长度之和的中间的数，那就中位数。
// 还有另一种，那就是参考归并排序思想，将短的数组取完就好.
// 前一种复杂度稳定，后一种在两个数组一样长并且值都是混合在一起的时候，复杂度会退化到n.
// 所以~其实还可以把这两种办法混合起来，就是编码复杂度较高了。
var findMedianSortedArrays = function (nums1, nums2) {
  let arr = []
  let i = 0
  let j = 0
  let length1 = nums1.length
  let length2 = nums2.length
  while(i < length1 && j < length2) {
    if (nums1[i] <= nums2[j]) {
      arr.push(nums1[i++])
    } else {
      arr.push(nums2[j++])
    }
  }
  // 但是，并不需要将数组合并起来，因为数组剩下的部分一定比arr大
  if (j < nums2.length) {
    i = j
    nums1 = nums2
  }
  let total = length1 + length2
  if (total % 2 !== 0)  {
    let middleIndex = Math.floor(total / 2) + 1
    if (middleIndex > arr.length) {
      return nums1[nums1.length - middleIndex]
    } else {
      return arr[middleIndex - 1]
    }
  } else {
    let middleIndex = total / 2
    if (middleIndex > arr.length) {
      return (nums1[nums1.length - middleIndex] + nums1[nums1.length - middleIndex - 1]) / 2
    } else if(middleIndex === arr.length) {
      return (arr[middleIndex - 1] + nums1[nums1.length - middleIndex]) / 2
    } else {
      return (arr[middleIndex - 1] + arr[middleIndex]) / 2
    }
  }
};
var nums1 = [1]
var nums2 = [2, 3, 4, 5]

console.log(findMedianSortedArrays(nums1, nums2))