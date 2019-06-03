/**
 * 
 * 
4
 +6
 (0,0)                 (1,6)                 (2,12)

 (3,1)        (4,5)    (5,7)          (6,11) (7,13)            (8,17)

 (9,2)  (10,4)         (11,8)  (12,10)       (13, 14)  (14, 16)
 
 (15,3)                (16,9)                (17, 15)
5
      col1                  col2                   col3
 row1 0,0                  1,8                     2,16
 
 row2 3,1            4 ,7  5,9               6,15, 7,17
 
 row3 8,2        9,6       10,10       14,11       12,18         13,22
 
 row4 14,3  15,5           16,11  17,13            18,19   19,21
 
 row5 20,4                 21,12                   22,20

 * @param {*} s 
 * @param {*} numRows 
 */
var convert = function (s, n) {
  let len = s.length
  let str = ''
  let cLen = (n - 1) * 2
  for (let i = 0; i < n; i++) {
    for (let j = 0; i + j < len; j+=cLen ) {
      str += s[i + j]
      if (i !== 0 && i !== n - 1 && j + cLen - i < len) { // 不是第一行和最后一行
        str += s[j + cLen - 1]
      }
    }
  }
  return str
};

console.log(convert('LEETCODEISHIRINGIXZXSA', 5));