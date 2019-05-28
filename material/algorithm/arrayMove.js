// 算法题「移动零」，给定一个数组 nums，编写一个函数将所有 0 移动到数组的末尾，同时保持非零元素的相对顺序。
let arr = [0, 0, 0, 12, 2, 1, 0, 0, 0, 123, 12, 0, 14, 0, 14, 0,0]

let SortIndex = 0
for (let i = 0; i < arr.length; i++) {
  let item = arr[i]
  if (item !== 0) {
    let temp = arr[SortIndex]
    arr[SortIndex] = arr[i]
    arr[i] = temp
    SortIndex++
  }
}


let moveZero = (arr) => {
  let point = -1
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] != 0 && point !== -1) {
      arr[point] = arr[i]
      arr[i] = 0
      point++
    } else if (point === -1 && arr[i] === 0) {
      point = 0
    }
  }
  return arr
}
console.log(moveZero(arr))