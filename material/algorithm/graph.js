/**
 * 图的 “最短路径” 问题
 * 迪杰斯特拉算法
 * E*logV
 */

/**
 * class 边
 */
class Edge {
  /**
   * 
   * @param {number} index 边终点的编号
   * @param {*} from 
   * @param {*} to 
   * @param {*} weight 
   */
  constructor(startIndex, endIndex, from, to, weight) {
    this.startIndex = startIndex
    this.endIndex = endIndex
    this.from = from
    this.to = to
    this.weight = weight
  }
  toString () {
    return this.from + '_' + this.to
  }
}

class Graph {
  constructor () {
    this.vertices = [] // 顶点数
    this.edges = 0 // 边数
    this.adj = [] // 相邻边的数据集合
  }
  /**
   * 通过添加两个点实现添加边
   * @param {string} v 顶点编号
   * @param {string} w 相邻点编号
   * @param {string} weight 边的权重
   */
  addEdge (v, w, weight) {
    let idx = this.addVertex(v)
    let idx1 = this.addVertex(w)
    this.adj[idx].push(new Edge(idx, idx1, v, w, weight))
    this.adj[idx1].push(new Edge(idx1, idx, w, v, weight))
    this.edges++
  }
  /**
   * 添加顶点
   * @param {strin} v 顶点编号
   */
  addVertex (v) {
    let idx = this.vertices.indexOf(v)
    if (idx === -1) {
      this.vertices.push(v)
      idx = this.vertices.length - 1
    }
    // 如果没有这个顶点的边的信息，创建一个空数组
    if (this.adj[idx] === undefined) {
      this.adj[idx] = []
    }
    return idx
  }
  toString () {
    for (let i = 0; i < this.vertices.length; i++) {
      let adjacent = []
      for (let j = 0; j < this.vertices.length; j++) {
        if (this.adj[i][j] !== undefined) {
          adjacent.push(this.vertices[this.adj[i][j].endIndex])
        }
      }
      console.log('顶点' + this.vertices[i] + '相邻的顶点为: (' + adjacent.join(',') + ')')
    }
  }
  getGraphEdges () {
    console.log(this.adj)
  }
  /**
   * 获取某两个顶点的最短路径
   * @param {string} vertex1
   * @param {string} vertex2
   */
  dijkstra (vertex1, vertex2) {
    // debugger
    let start = this.vertices.indexOf(vertex1)
    let end = this.vertices.indexOf(vertex2)
    if (start === -1 || end === -1) {
      return
    }
    let accessedSet = new Set()
    let distences = this.vertices.map((v) => {
      return {
        name: v,
        distence: Number.MAX_SAFE_INTEGER,
        isVisited: false
      }
    })
    distences[start].distence = 0
    let adj = this.adj
    // todo: 代码实现不好，下次重新写一个
    function accesseVertex (vertexIndex) {
      if (!accessedSet.has(vertexIndex)) {
        accessedSet.add(vertexIndex)
        distences[vertexIndex].isVisited = true
        let adjs = adj[vertexIndex]
        for (let i = 0; i < adjs.length; i++) {
          let edge = adjs[i]
          if ((edge.weight + distences[edge.startIndex].distence) < distences[edge.endIndex].distence) {
            distences[edge.endIndex].distence = edge.weight + distences[edge.startIndex].distence
          }
        }
        // 然后获取距离A最近的没有遍历过的点，继续计算
        let minVertex = {
          distence: Number.MAX_SAFE_INTEGER
        }
        let minIndex
        for (let i = 0; i < distences.length; i++) {
          if ((!distences[i].isVisited) && minVertex.distence > distences[i].distence) {
            minVertex = distences[i]
            minIndex = i
          }
        }
        if (minIndex) {
          accesseVertex(minIndex)
        }
      }
    }
    accesseVertex(start, end)
    // console.log(time)
  }
}

let g = new Graph()
g.addEdge('A', 'C', 2)
g.addEdge('A', 'B', 5)
g.addEdge('B', 'D', 1)
g.addEdge('B', 'E', 6)
g.addEdge('C', 'D', 6)
g.addEdge('C', 'F', 8)
g.addEdge('D', 'F', 2)
g.addEdge('D', 'E', 1)
g.addEdge('E', 'G', 7)
g.addEdge('F', 'G', 3)
// g.getGraphEdges()
g.dijkstra('A', 'G')
g.dijkstra2('A', 'G')