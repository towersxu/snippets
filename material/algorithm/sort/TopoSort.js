/**
 * 拓扑排序-Kahn排序
 * 先将依赖转化为有向图
 * 通过有向图，能获取出来图的每一个点所指向的下一个点。
 * 创建一个map，记录每一个点被指向这个点的数量。
 * 创建一个队列qunue，将前面map中被指向这个点数量为0的点放入这个队列。
 * 将这个队列的点进行出队
 * 每个点出队的时候，这个点的指向的所有的点的被指向这个点的数量减1。就是map中记录的点（出队点的指向点）数量减一，
 * 如果数量减为0了（这个点的前置点都出队列了），将这个点也加入出队队列。
 */
let dependce = [
  'f->g',
  'c->g',
  'd->e',
  'b->d',
  'c->e',
  'b->c',
  'a->f',
  'f->c'
]
class Graph {
  constructor () {
    this.linkedList = {}
    this.size = 0
  }
  add (s, t) {
    if (!this.linkedList[s]) {
      this.linkedList[s] = []
      this.size++
    }
    this.linkedList[s].push(t)
  }
}

let g = new Graph()
for (let i = 0; i < dependce.length; i++) {
  let d = dependce[i].split('->')
  g.add(d[0], d[1])
}

function TopoSortByKahn (graph) {
  let inDegree = {}
  for (let g in graph.linkedList) {
    if (inDegree[g] === undefined) {
      inDegree[g] = 0
    }
    let arr = graph.linkedList[g]
    for (let i = 0; i < arr.length; i++) {
      let g1 = arr[i]
      if (inDegree[g1] === undefined) {
        inDegree[g1] = 0
      }
      inDegree[g1]++
    }
  }
  let queue = []
  for (let key in inDegree) {
    if (inDegree[key] === 0) {
      queue.push(key)
      delete inDegree[key]
    }
  }
  let array = []
  while(queue.length > 0) {
    let i = queue.shift()
    array.push(i)
    let g = graph.linkedList[i]
    for (let j = 0; g && j < g.length; j++) {
      let g1 = graph.linkedList[i][j]
      inDegree[g1]--
      if (inDegree[g1] === 0) {
        queue.push(g1)
        delete inDegree[g1]
      }
    }
  }
  console.log(array)
}

TopoSortByKahn(g)