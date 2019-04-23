let arr = [412, 34, 31, 32, 12]

function insertSort (arr) {
  if (arr.length <= 1) return
  for (let i = 1; i < arr.length; i++) {
    let value = arr[i]
    let j = i - 1
    for (; j >= 0; j--) {
      console.log(arr)
      if (arr[j] > value) {
        arr[j + 1] = arr[j];
      } else {
        break
      }
    }
    arr[j + 1] = value
  }

  return arr
}

insertSort(arr)