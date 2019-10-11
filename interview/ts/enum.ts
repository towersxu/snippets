/**
 * enum类型是对JavaScript标准数据类型的一个补充。 
 * 像C#等其它语言一样，使用枚举类型可以为一组数值赋予友好的名字。
 * 默认情况下，从0开始为元素编号。 你也可以手动的指定成员的数值。
 */

enum Week {
  Monday = '星期一',
  Tuesday = '星期二', 
  Wednesday = '星期三', 
  Thursday = '星期四', 
  FriDay = '星期五'
}

console.log(Week.Wednesday)