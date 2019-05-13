// 计数排序

// 数据在0-5之间
let arr = [2, 5, 3, 0, 2, 3, 0, 3]

function CountingSort (array, max) {
  let countingArray = []
  for (let i = 0; i <= max; i++) {
    countingArray.push(0)
  }
  
  for (let i = 0; i < array.length; i++) {
    countingArray[array[i]]++
  }

  for (let i = 1; i <= max; i++) {
    countingArray[i] = countingArray[i] + countingArray[i - 1]
  }

  let result = []
  // 采用从前到后插入到新数组里面，这样成为了非稳定的算法。
  // for (let i = 0; i < array.length; i++) {
  //   let idx = countingArray[array[i]]
  //   result[idx - 1] = array[i]
  //   countingArray[array[i]]--
  // }
  // 从后向前就是稳定算法
  for (let i = array.length - 1; i >= 0; --i) {
    let idx = countingArray[array[i]]
    result[idx - 1] = array[i]
    countingArray[array[i]]--
  }
  
  for (let i = 0; i < array.length; i++) {
    array[i] = result[i]
  }
}

CountingSort(arr, 5)
console.log(arr)