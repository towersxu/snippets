package material.algorithm.sort;

import java.util.Arrays;

public class InsertSort {
  public static void main(String[] args) {
    int[] arr = {412, 34, 31, 32, 12};
    sort(arr);
    System.out.print(Arrays.toString(arr));
  }
  public static void sort(int[] arr) {
    for (int i = 1; i < arr.length; i++) {
      int value = arr[i];
      int j = i - 1;
      for (; j >=0; j--) {
        if (arr[j] > value) {
          arr[j + 1] = arr[j];
        } else {
          break;
        }
      }
      // 这里是j+1;因为最后还要执行一次j--
      arr[j + 1] = value;
    }
  } 
}
