let arr = [11, 8, 3, 9, 7, 1, 2, 5]
function MergeSort (arr) {
  MergeSortC(arr, 0, arr.length - 1)
}
MergeSort(arr)
console.log(arr)

function MergeSortC (arr, startIndex, endIndedx) {
  if (startIndex >= endIndedx) return;

  let middleIndex = Math.floor((startIndex + endIndedx) / 2);
  console.log(middleIndex)
  MergeSortC(arr, startIndex, middleIndex);
  MergeSortC(arr, middleIndex + 1, endIndedx);

  merge(arr, startIndex, middleIndex, endIndedx);
}

function merge (arr, startIndex, middleIndex, endIndedx) {
  debugger
  console.log(arr, startIndex, middleIndex, endIndedx)
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
  if (j < endIndedx) { // 表示后半部分没有排序完成
    start = j
    end = endIndedx
  }
  while (start <= end) {
    newArr[k++] = arr[start++]
  }
  for (let i = 0; i < endIndedx; i++) {
    arr[startIndex + i] = newArr[i]
  }
}