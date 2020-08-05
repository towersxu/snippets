/**
 * 合并时间段这个需求，可以等同于合并线段。
 * 思路: 
 * 将当前的待比较的时间段，与前面所有的已比较数组中的内容的进行比较
 * 如果前面已比较的某一项与当前项没有交叉（）
 * 则将其放入新的已比较数组
 */
const lineSegments = [
  {
    start: 1,
    end: 3
  },
  {
    start: 2, // 和前面的一个交叉
    end: 4
  },
  {
    start: 5,
    end: 7
  },
  {
    start: 9,
    end: 11,
  },
  {
    start: 6, // 和前面两个都
    end: 10
  },
  {
    start: 14,
    end: 15
  },
  {
    start: 13, // 包裹前面某个
    end: 17
  },
  {
    start: 20,
    end: 22
  }, 
  {
    start: 18,
    end: 21
  }
]
// 比较每个线段是否与前面以比较的线段交叉，如果交叉，则合并
let comparedArr = []
lineSegments.forEach((needCompareItem) => {
  addToNewArr(needCompareItem);
})

console.log(comparedArr);

function addToNewArr (needCompareItem) {
  if (comparedArr.length === 0) {
    comparedArr.push(needCompareItem);
    return
  }
  let comparedNewArr = []
  for (let i = 0; i < comparedArr.length; i++) {
    let comparedItem = comparedArr[i];
    // 此处特殊
    let isMergedCompareItem = getNewCompared(needCompareItem, comparedItem);
    // 如何不交叉，那么将其已比较的加入新数组
    // (这里有两个思路，1种是不交叉的加入新数组，第2种是交叉了删除原数组，第2种代码阅读性不强)
    if (!isMergedCompareItem) {
      comparedNewArr.push(comparedItem)
    } else {
      needCompareItem = isMergedCompareItem;
    }
  }
  comparedNewArr.push(needCompareItem);
  comparedArr = comparedNewArr;
}

function getNewCompared (needCompareItem, comparedItem) {
  if (needCompareItem.start > comparedItem.end || needCompareItem.end < comparedItem.start) return
  return {
    start: Math.min(needCompareItem.start, comparedItem.start),
    end: Math.max(needCompareItem.end, comparedItem.end)
  }
}
