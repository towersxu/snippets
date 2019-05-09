let arr = [11, 8, 3, 9, 7, 1, 2, 5]
function MergeSort (arr) {
  MergeSortC(arr, 0, arr.length - 1)
}
MergeSort(arr)
console.log(arr)

function MergeSortC (arr, startIndex, endIndedx) {
  if (startIndex >= endIndedx) return;

  let middleIndex = Math.floor((startIndex + endIndedx) / 2);
  MergeSortC(arr, startIndex, middleIndex);
  MergeSortC(arr, middleIndex + 1, endIndedx);

  merge(arr, startIndex, middleIndex, endIndedx);
}

function merge (arr, startIndex, middleIndex, endIndedx) {
  let p = startIndex // 记录最开始的数组位置，用于最后的重新赋值
  let newArr = []
  let k = 0
  let j = middleIndex + 1
  while (startIndex <= middleIndex && (j <= endIndedx)) {
    if (arr[startIndex] <= arr[j]) {
      newArr[k++] = arr[startIndex++]
    } else {
      newArr[k++] = arr[j++]
    }
  }
  let start = startIndex
  let end = middleIndex
  if (j <= endIndedx) { // 表示后半部分没有排序完成
    start = j
    end = endIndedx
  }
  while (start <= end) { // 没有排序完成的，都是有序的最大的内容
    newArr[k++] = arr[start++]
  }
  for (let i = 0; i < newArr.length; i++) {
    arr[p + i] = newArr[i]
  }
}