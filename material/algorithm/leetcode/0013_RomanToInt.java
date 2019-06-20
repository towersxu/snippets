package material.algorithm.leetcode;

class RomanToInt {
  public static void main(String[] args) {
    String s = "MCMXCIV";
    System.out.println(romanToInt(s));
  }

  public static int romanToInt(String s) {
    int num = 0;
    if (null == s || "".equals(s.trim())) {
      return num;
    }
    int len = s.length();
    for (int i = 0; i < len; i++) {
      char c1 = s.charAt(i);
      if (i + 1 < len) {
        char c2 = s.charAt(i + 1);
        int n = getSpecailNum(c1, c2);
        if (n != 0) {
          i++;
          num += n;
        } else {
          num += getNum(c1);
        }
      } else {
        num += getNum(c1);
      }
    }
    return num;
  }
  public static int getNum(char n) {
    if (n == 'I') {
      return 1;
    } else if (n == 'V') {
      return 5;
    } else if (n == 'X') {
      return 10;
    } else if (n == 'L') {
      return 50;
    } else if (n == 'C') {
      return 100;
    } else if (n == 'D') {
      return 500;
    } else if (n == 'M') {
      return 1000;
    }
    return 0;
  }
  public static int getSpecailNum (char n1, char n2) {
    if (n1 == 'I') {
      if (n2 == 'V') {
        return 4;
      } else if (n2 == 'X') {
        return 9;
      }
    }
    if (n1 == 'X') {
      if (n2 == 'L') {
        return 40;
      } else if (n2 == 'C') {
        return 90;
      }
    }
    if (n1 == 'C') {
      if (n2 == 'D') {
        return 400;
      } else if (n2 == 'M') {
        return 900;
      }
    }
    return 0;
  }
}