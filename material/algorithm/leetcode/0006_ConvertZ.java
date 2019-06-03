package material.algorithm.leetcode;

class ConvertZ {
    public static void main(String[] args) throws InterruptedException {
      String s = "LEETCODEISHIRINGIXZXSA";
      String r = convert(s, 5);
      System.out.println(r);
    }
    public static String convert(String s, int numRows) {
      if (numRows == 1) return s;
      // 速度快慢为：StringBuilder > StringBuffer > String
      // String为字符串常量，而StringBuilder和StringBuffer均为字符串变量，
      // 即String对象一旦创建之后该对象是不可更改的，但后两者的对象是变量，是可以更改的。
      // 在线程安全上，StringBuilder是线程不安全的，而StringBuffer是线程安全的
      // String：适用于少量的字符串操作的情况
      // StringBuilder：适用于单线程下在字符缓冲区进行大量操作的情况
      // StringBuffer：适用多线程下在字符缓冲区进行大量操作的情况
      String str = "";
      int len = s.length();
      int cLen = numRows * 2 - 2;
      for (int i = 0; i < numRows; i++) {
        for (int j = 0; j + i < len; j += cLen) {
          str += s.charAt(i + j);
          if (i != 0 && i != numRows - 1 && j + cLen - i < len) {
            str += s.charAt(j + cLen - i);
          }
        }
      }
      return str;
    }
}