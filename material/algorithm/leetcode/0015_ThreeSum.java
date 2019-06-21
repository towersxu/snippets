package material.algorithm.leetcode;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

class ThreeSum {
  public static void main(String[] args) {
    int[] s = { -1, 5, 6, -2, 10, 1, 2, -1, -4 };
    System.out.println(threeSum(s));
  }

  public static List<List<Integer>> threeSum(int[] nums) {
    int len = nums.length;
    if (len < 3)
      return new ArrayList<List<Integer>>();
    // -4, -2, -1, -1, 1, 2, 5, 6, 10
    Arrays.sort(nums); // sort the array first
    List<List<Integer>> res = new ArrayList<>();
    int max = Math.max(nums[len - 1], Math.abs(nums[0])); // to allocate enough space to avoid check in if statement

    byte[] hash = new byte[(max << 1) + 1];
    for (int v : nums) { // hash and count appearing times of every num
      hash[v + max]++;
    }

    int lastNeg = Arrays.binarySearch(nums, 0); // search the position of 0; it also means the position of the last
                                                // negative number in array
    int firstPos = lastNeg; // the position of the first positive number in array
    if (lastNeg < 0) { // 0 not found
      firstPos = ~lastNeg;
      lastNeg = -lastNeg - 2;// see the Java api
    } else { // found
      while (lastNeg >= 0 && nums[lastNeg] == 0) // skip all 0
        --lastNeg;
      while (firstPos < len && nums[firstPos] == 0)
        ++firstPos;
      int zeroCount = firstPos - lastNeg - 1;
      if (zeroCount >= 3) { // (0 appears 3 times at least)
        res.add(Arrays.asList(0, 0, 0));
      }
      if (zeroCount > 0) { // (0 appears 1 times at least)
        for (int i = firstPos; i < len; ++i) { // traverse all the positive numbers to see whether there is a negative
                                               // number whose absolute value equals to the positive number
          if (i > firstPos && nums[i] == nums[i - 1]) // skip the same elements
            continue;
          if (hash[-nums[i] + max] > 0) {
            res.add(Arrays.asList(0, nums[i], -nums[i]));
          }
        }
      }
    }

    // one positive number and two negetive numbers
    for (int i = firstPos; i < len; ++i) { // traverse all the positive numbers to find whether there are two negative
                                           // numbers to make the 3 numbers added up to 0
      if (i > firstPos && nums[i] == nums[i - 1]) // skip the same elements
        continue;
      int half; // we can traverse only half of the positive numbers
      if (nums[i] % 2 != 0)
        half = -((nums[i] >> 1) + 1);
      else {
        half = -(nums[i] >> 1);
        if (hash[half + max] > 1)
          res.add(Arrays.asList(nums[i], half, half));
      }
      for (int j = lastNeg; j >= 0 && nums[j] > half; --j) {
        if (j < lastNeg && nums[j] == nums[j + 1])
          continue;
        if (hash[(-nums[i] - nums[j]) + max] > 0)
          res.add(Arrays.asList(nums[i], nums[j], -nums[i] - nums[j]));
      }
    }

    // one negative number and two positive numbers
    for (int i = lastNeg; i >= 0; --i) { // traverse all the negative numbers to find whether there are two positive
                                         // numbers to make the 3 numbers added up to 0
      if (i < lastNeg && nums[i] == nums[i + 1])// skip the same elements
        continue;
      int half; // we can traverse only half of the negative numbers
      if (nums[i] % 2 != 0)
        half = -(nums[i] / 2 - 1);
      else {
        half = -(nums[i] >> 1);
        if (hash[half + max] > 1)
          res.add(Arrays.asList(nums[i], half, half));
      }
      for (int j = firstPos; j < len && nums[j] < half; ++j) {
        if (j > firstPos && nums[j] == nums[j - 1])
          continue;
        if (hash[(-nums[i] - nums[j]) + max] > 0)
          res.add(Arrays.asList(nums[i], nums[j], -nums[i] - nums[j]));
      }
    }
    return res;
  }
  // public static List<List<Integer>> threeSum(int[] nums) {
  //   Arrays.sort(nums);
  //   List<List<Integer>> tuples = new ArrayList<>();
  //   for (int i = 0; i < nums.length - 2; i++) {
  //     if (i > 0 && nums[i - 1] == nums[i]) {
  //       continue; // 去重
  //     }
  //     if (nums[i] > 0) { // 因为排过序，大于0的时候，后面的三数之和一定不等于0；
  //       break;
  //     }
  //     int l = i + 1, r = nums.length - 1;
  //     // if(nums[l] < 0 && Integer.MIN_VALUE-nums[l] > nums[i]) continue; //如果溢出最小值则跳过
  //     // if(nums[i] > 0 && Integer.MAX_VALUE-nums[l] < nums[i]) break; //溢出最大值直接结束，不可能会有新的三元组出现了
  //     while (l < r) {
  //       if(nums[r] > -nums[i]-nums[l]){
  //         while(l < r && nums[r-1] == nums[r]) r--; //右指针去重
  //         r--;
  //       }
  //       else if(nums[r] < -nums[i]-nums[l]){
  //         while(l < r && nums[l+1] == nums[l]) l++; //左指针去重
  //         l++;
  //       }
  //       else{
  //         tuples.add(Arrays.asList(nums[i],nums[l],nums[r]));
  //         while(l < r && nums[r-1] == nums[r]) r--; //左指针去重
  //         while(l < r && nums[l+1] == nums[l]) l++; //右指针去重
  //         r--;
  //         l++;
  //       }
  //     }
  //   }
  //   return tuples;
  // }
}