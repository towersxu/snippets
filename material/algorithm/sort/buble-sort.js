let arr = [412, 34, 31, 32, 12]

function bubleSort (arr) {
  for (let i = 0; i < arr.length; i++) {
    // 为什么这个是冒泡排序？
    // 因为完成下面的循环就是把从第i位到最后的n位中最小的放到第i位。
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] < arr[i]) {
        let t = arr[j]
        arr[j] = arr[i]
        arr[i] = t
      }
    }
  }
}

bubleSort(arr)