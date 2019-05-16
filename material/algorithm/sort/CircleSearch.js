/**
 * 获取循环有序数组中的给定值
 */

let arr = [11, 12, 13, 14, 15, 16, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

function CircleSearch (array, val) {
  let left = 0
  let right = array.length - 1
  // 如果左侧的值大于右侧的值。
  while (left <= right) {
    let middle = left + ((right - left) >> 1)
    let middleVal = array[middle]
    if (middleVal === val)  {
      return middle
    }
    let leftVal = array[left]
    let rightVal = array[right]
    if (leftVal <= rightVal) { // 正常顺序
      if (val < middleVal) { 
        right = middle - 1
      } else {
        left = middle + 1
      }
    } else { // 混乱顺序
      // 如果要获取的值大于最右边的值，说明在左边
      // 如果中间的值小于最左边的值，说明左侧混乱，右侧有序
      if (middleVal < leftVal) {
        // 怎么判断要获取的值是在混乱区级还是有序区级呢？
        // 如果这个值不在有序区,那么就在混乱去
        if (val > middleVal && val <= rightVal) {
          left = middle + 1
        } else {
          right = middle - 1
        }
      } else { // 左侧有序，右侧混乱
        if (val >= leftVal && val < middleVal) {
          right = middle - 1
        } else {
          left = middle + 1
        }
      }
    }
    // if (val > middleVal || val < leftVal) { // 如果值大于中间值或者中间值大于最左边的值，表示右侧有循环的
    //   left = middle + 1
    // } else { // val比middleVal小，则可能在左边，也可能在右边
    //   right = middle - 1
    // }
  }
  return -1
}

let index = CircleSearch(arr, 10)
console.log(index)