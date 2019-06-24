package material.algorithm.leetcode;

import java.util.ArrayList;
import java.util.List;

class LetterCombinations {
  public static void main(String[] args) {
    System.out.println(letterCombinations("24"));
  }
  public static List<String> letterCombinations(String s) {
    if (s.length() == 0) return new ArrayList<String>();

    char[][] map = new char[][]{
      { 'a', 'b', 'c'},
      { 'd', 'e', 'f'},
      { 'g', 'h', 'i'},
      { 'j', 'k', 'l'},
      { 'm', 'n', 'o'},
      { 'p', 'q', 'r', 's'},
      { 't', 'u', 'v'},
      { 'w', 'x', 'y', 'z'}
    };
    char[] number = s.toCharArray();
    //计算最终结果数量
    int resultCount = 1;
    for (char c : number) {
      resultCount *= map[c - '2'].length;
    }
    // 动态规划？先初始化
    char[][] result = new char[resultCount][number.length];
    int repeat = 1;
    for (int i = 0; i < number.length; i++) {
      //计算当前位号码的重复次数
      repeat *= i > 0 ? map[number[i - 1] - '2'].length : 1;
      for (int j = 0; j < repeat; j++) {
        //字符数
        int numberChars = map[number[i] - '2'].length;
        //计算每个字符连续次数
        int continueCount = resultCount / repeat / numberChars;
        //当前行起始下标
        int currentIndex = j * numberChars * continueCount;
        for (int k = 0; k < numberChars; k++) {
          for (int l = 0; l < continueCount; l++) {
            result[currentIndex + k * continueCount + l][i] = map[number[i] - '2'][k];
          }
        }
      }
    }
    List<String> list = new ArrayList<>(resultCount);
    for (char[] arr : result) {
      list.add(new String(arr));
    }
    return list;
  }
}