package material.algorithm.leetcode;

import java.util.Arrays;

class ThreeSumClosest {
  public static void main(String[] args) {
    int[] s = { -1, 5, 6, -2, 10, 1, 2, -1, -4 };
    System.out.println(threeSum(s, 127));
  }
  // 这种思路是遍历所有的数组元素组合，比较出差别最小的。在数组内容比较多的时候会比较慢。
  public static int threeSum(int[] nums, int target) {
    Arrays.sort(nums);
    int ans = nums[0] + nums[1] + nums[2];
    for (int i = 0; i < nums.length; i++) {
      int start = i + 1, end = nums.length - 1;
      while (start < end) {
        int sum = nums[start] + nums[end] + nums[i];
        if (Math.abs(target - sum) < Math.abs(target - ans))
          ans = sum;
        if (sum > target)
          end--;
        else if (sum < target)
          start++;
        else
          return ans;
      }
    }
    return ans;
  }
  // 这种思路是重差距为0开始找，找不到再找1，找不到再找2，直到找到，最好情况很快，最差情况，如果是target差距特别大10000？？，则特别慢。
  // public static int threeSum(int[] nums, int target) {
  //   int res = target;
  //   Arrays.sort(nums);
  //   // System.out.println(Arrays.toString(nums));
  //   int cha = 0;
  //   while (true) {
  //     Boolean find = false;
  //     if (cha == 0) {
  //       find = tree(nums, target);
  //       if (find)
  //         break;
  //     } else {
  //       res = target + cha;
  //       // System.out.println(res);
  //       find = tree(nums, res);
  //       if (find)
  //         break;
  //       res = target - cha;
  //       // System.out.println(res);
  //       find = tree(nums, res);
  //       if (find)
  //         break;
  //     }
  //     System.out.println(cha);
  //     cha++;
  //   }

  //   return res;
  // }
  
  // public static Boolean tree(int[] nums, int target) {
  //   for (int i = 0; i < nums.length - 2; i++) {
  //     int remain = target - nums[i];
  //     int left = i + 1, right = nums.length - 1;
  //     // System.out.println("in "+ i + " "+remain+" "+left+" "+right);
  //     while (left < right) {
  //       if (nums[left] + nums[right] == remain) {
  //         return true;
  //       } else if (nums[left] + nums[right] < remain) {
  //         left++;
  //       } else {
  //         right--;
  //       }
  //     }
  //   }
  //   return false;
  // }
}