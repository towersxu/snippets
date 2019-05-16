/**
 * 二分查找
 * 查找第一个值等于给定值的元素，返回元素的位置
 */

let array = [2, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 5, 5, 5, 5, 5, 6, 6, 6, 6, 6, 6, 6, 7, 7, 7, 7, 7, 7, 7, 7, 7, 8, 8, 8, 9, 9, 10]

function BinarySearch(array, val) {
  let s = 0
  let start = s
  let e = array.length - 1
  let end = e
  let middle = Math.floor(array.length / 2)
  while (middle > s && middle < e) {
    let currentValue = array[middle]
    let preValue = array[middle - 1]
    if (currentValue > val) {
      end = middle - 1
      middle = Math.floor((start + end) / 2)
    } else if (currentValue < val) {
      start = middle + 1
      middle = Math.floor((start + end) / 2)
    } else if (preValue === currentValue) { // 获取第一个值等于给定值
      end = middle - 1
      middle = Math.floor((start + end) / 2)
    } else {
      return middle
    }
  }
  return array[middle] === val ? middle : -1
}

let index = BinarySearch(array, 10)
console.log(index)

function BinarySearch1 (array, val) {
  let low = 0
  let high = array.length - 1
  while (low <= high) {
    let middle = low + ((high - low) >> 1)
    if (array[middle] >= val) {
      high = middle - 1
    } else {
      low = middle + 1
    }
  }
  if (low < array.length && array[low] === val) return low
  else return -1
}

let index1 = BinarySearch1(array, 10)
console.log(index1)