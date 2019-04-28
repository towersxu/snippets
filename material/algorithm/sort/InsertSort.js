let arr = [412, 34, 31, 32, 12]

function insertSort (arr) {
  if (arr.length <= 1) return
  for (let i = 1; i < arr.length; i++) {
    let value = arr[i]
    let j = i - 1
    // 为什么叫插入排序？
    // 下面的循环的意思只要第i位比前面的任意一位(j)小，将j至i-1位向后移动一位。
    // 然后将第i位的值放入到最后一个比i大的位置。
    // 注意，由于上面插入操作，i前的所有位都是按照从小到大排序了。
    //（有点人叫“动态排序”，即动态地往有序集合中添加数据）
    for (; j >= 0; j--) {
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