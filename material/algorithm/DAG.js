// 给定一个城市的地图，所有的道路都是单行道，而且不会构成环。
// 每条道路都有过路费，问您从S点到T点花费的最少费用。

/**
 * S->A: 10
 * S->B: 20
 * A->C: 30
 * A->D: 10
 * B->D: 20
 * C->D: 5
 * C->T: 20
 * D->T: 10
 */

class Node {
  constructor (name) {
    this.name = name
    this.preNodeList = []
  }
  connect (node, cost) {
    let nodeWithCast = {
      node: this,
      cost
    }
    node.preNodeList.push(nodeWithCast)
  }
}

let S = new Node('S')
let A = new Node('A')
let B = new Node('B')
let C = new Node('C')
let D = new Node('D')
let T = new Node('T')
S.connect(A, 10)
S.connect(B, 20)
A.connect(C, 30)
A.connect(D, 10)
B.connect(D, 20)
C.connect(D, 5)
C.connect(T, 20)
D.connect(T, 10)


let distenceState = []
T.cost = 0
cacu(T)
// 计算这个点到终点的花费，从终点到起点
function cacu (currentNode) {
  if (currentNode.name === 'S') {
    distenceState.push(currentNode.cost)
  } else {
    for (let i = 0; i < currentNode.preNodeList.length; i++) {
      let n = currentNode.preNodeList[i]
      let cost = n.cost + currentNode.cost
      if (!n.node.cost ||  cost < n.node.cost ) {
        n.node.cost = cost
      }
      cacu(n.node)
    }
  }
}
console.log(distenceState)
