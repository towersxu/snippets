package material.algorithm.sort;

import java.util.LinkedList;

public class TopoSort {
  public static void main(String[] args) {
    TopoSort ts = new TopoSort();
    ts.graph(7);
    // ts.addEdge(4, 5);
    ts.addEdge(5, 6);
    ts.addEdge(2, 6);
    ts.addEdge(3, 4);
    ts.addEdge(1, 3);
    ts.addEdge(2, 4);
    ts.addEdge(1, 2);
    ts.addEdge(0, 5);
    ts.addEdge(5, 2);
    ts.topoSortByKahn();
  }
  private int v;
  private LinkedList<Integer> adj[];
  public void graph (int v) {
    this.v = v;
    this.adj = new LinkedList[v];
    for (int i = 0; i < v; ++i) {
      adj[i] = new LinkedList<>();
    }
  }
  public void addEdge(int s, int t) {
    adj[s].add(t);
  }
  
  public void topoSortByKahn() {
    int[] inDegree = new int[v]; // 统计每个顶点的入度
    for (int i = 0; i < v; ++i) {
      for (int j = 0; j < adj[i].size(); ++j) {
        int w = adj[i].get(j); // i->w
        // System.out.print("-->" + w);
        inDegree[w]++;
      }
    }
    LinkedList<Integer> queue = new LinkedList<>();
    for (int i = 0; i < v; ++i) {
      if (inDegree[i] == 0)
        queue.add(i);
    }
    while (!queue.isEmpty()) {
      int i = queue.remove();
      System.out.print("->" + i);
      for (int j = 0; j < adj[i].size(); ++j) {
        int k = adj[i].get(j);
        inDegree[k]--;
        if (inDegree[k] == 0)
          queue.add(k);
      }
    }
  }
}
