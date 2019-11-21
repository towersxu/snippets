# Java的hashcode

```java
public static int hashCode(Object a[]) {
  if (a == null)
    return 0;
  
  int result = 1;
  for (Object element : a)
    result = 31 * result + (element == null ? 0: element.hashCode());
  return result;
}
```

为什么使用31？

31是质子数中一个“不大不小”的存在，如果你使用的是一个如2的较小质数，那么得出的乘积会在一个很小的范围，很容易造成哈希值的冲突。而如果选择一个100以上的质数，得出的哈希值会超出int的最大范围，这两种都不合适。而如果对超过 50,000 个英文单词（由两个不同版本的 Unix 字典合并而成）进行 hash code 运算，并使用常数 31, 33, 37, 39 和 41 作为乘子，每个常数算出的哈希值冲突数都小于7个（国外大神做的测试），那么这几个数就被作为生成hashCode值得备选乘数了。

31可以被JVM优化, `31 * i = (i << 5) - i`
