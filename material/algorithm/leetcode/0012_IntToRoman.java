package material.algorithm.leetcode;

class IntToRoman {
  public static void main(String[] args) {
    int i = 3999;
    System.out.println(intToRoman(i));
  }
  
  public static String intToRoman(int num) {
    StringBuilder s1=new StringBuilder();
    s1.append(romanMap4(num / 1000));
    s1.append(romanMap3((num % 1000) / 100));
    s1.append(romanMap2((num % 100) / 10));
    s1.append(romanMap(num % 10));
    return s1.toString();
  }
  public static String romanMap (int n) {
    if (n == 1) {
      return "I";
    } else if (n == 2) {
      return "II";
    } else if (n == 3) {
      return "III";
    } else if (n == 4) {
      return "IV";
    } else if (n == 5) {
      return "V";
    } else if (n == 6) {
      return "VI";
    } else if (n == 7) {
      return "VII";
    } else if (n == 8) {
      return "VIII";
    } else if (n == 9) {
      return "IX";
    } else {
      return "";
    }
  }
  
  public static String romanMap2(int n) {
    if (n == 1) {
      return "X";
    } else if (n == 2) {
      return "XX";
    } else if (n == 3) {
      return "XX";
    } else if (n == 4) {
      return "XL";
    } else if (n == 5) {
      return "L";
    } else if (n == 6) {
      return "LX";
    } else if (n == 7) {
      return "LXX";
    } else if (n == 8) {
      return "LXXX";
    } else if (n == 9) {
      return "XC";
    } else {
      return "";
    }
  }
  public static String romanMap3(int n) {
    if (n == 1) {
      return "C";
    } else if (n == 2) {
      return "CC";
    } else if (n == 3) {
      return "CCC";
    } else if (n == 4) {
      return "CD";
    } else if (n == 5) {
      return "D";
    } else if (n == 6) {
      return "DC";
    } else if (n == 7) {
      return "DC";
    } else if (n == 8) {
      return "DC";
    } else if (n == 9) {
      return "CM";
    } else {
      return "";
    }
  }
  public static String romanMap4(int n) {
    if (n == 1) {
      return "M";
    } else if (n == 2) {
      return "MM";
    } else if (n == 3) {
      return "MMM";
    } else {
      return "";
    }
  }
}