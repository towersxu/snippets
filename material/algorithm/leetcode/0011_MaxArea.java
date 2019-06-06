package material.algorithm.leetcode;

class MaxArea {
  public static void main (String[] args) {
    int[] a = {1,4, 5, 4, 5, 6, 7, 8, 9, 10, 80, 10};
    System.out.println(maxArea(a));
  }

  public static int maxArea(int[] height) {
    int maxarea = 0, l = 0, r = height.length - 1;
    while (l < r) {
      maxarea = Math.max(maxarea, Math.min(height[l], height[r]) * (r - l));
      if (height[l] < height[r])
        l++;
      else
        r--;
    }
    return maxarea;
  }
  // public static int maxArea(int[] height) {
  //   int max = 0;
  //   for (int i = 0; i < height.length - 1; i++) {
  //     int maxJ = 0;
  //     int hi = height[i];
  //     for (int j = height.length -1; j > i; j--) {
  //       if (height[j] > maxJ) {
  //         maxJ = height[j];
  //         int ht = hi;
  //         if (maxJ < ht) {
  //           ht = maxJ;
  //         }
  //         int x = (j - i) * ht;
  //         if (x > max) {
  //           max = x;
  //         }
  //       }
  //     }
  //   }
  //   return max;
  // }
}