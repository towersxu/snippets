let arr = [11, 8, 3, 9, 7, 1, 2, 5, 12, 11, 13]

QuickSort(arr)
console.log(arr)

function QuickSort(array) {
  QuickSortC(array, 0, array.length - 1)
}

function QuickSortC(array, start, end) {
  if (start >= end) return
  let q = partition(array, start, end)
  QuickSortC(array, start, q - 1)
  QuickSortC(array, q + 1, end)
}
/**
 * 返回一个位置，这个位置之前的数都是比他小的数，
 * 这个位置之后的数都是比他大的数。
 * 初始这个位置(i)为0. 遍历数组，如果数组的某一项(j)比最后一个元素(标准元素-t)大
 * 则将这个位置(i)设置的值设置为j同时将数组的i和j位置的两个元素交换位置。
 * 最后，将t和当前i所指的元素交换位置。这样，位置i后面的元素逗都比i小，前面的元素都比i大了。
 */
function partition(array, start, end) {
  let i = start
  let t = array[end]
  for (let j = start; j < end; j++) {
    if (array[j] < t) {
      let temp = array[i]
      array[i] = array[j]
      array[j] = temp
      i++
    }
  }
  array[end] = array[i]
  array[i] = t
  return i
}
