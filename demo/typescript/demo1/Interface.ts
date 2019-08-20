interface Student {
  No: Number,
  Name: String,
  class?: String,
  readonly level: String,
  parents: String[]
}

function welcomeStudent (student: Student) {
  console.log('welcome ' + student.Name, ',your no is ' + student.No)
  if (student.class) {
    // student.level = 'x'
    console.log('your class is' + student.class)
  }
}

let student = {
  No: 1,
  Name: '张三',
  level: '一年级',
  parents: ['ax']
}

// student.parents[1] = 'x'

welcomeStudent(student)

let a: number[] = [1, 2, 3, 4];
let ro: ReadonlyArray<number> = a;
// ro[0] = 12; // error!
// ro.push(5); // error!
// ro.length = 100; // error!
// a = ro; // error!

// 最简单判断该用readonly还是const的方法是看要把它做为变量使用还是做为一个属性。 
// 做为变量使用的话用const，若做为属性则使用readonly。

interface SquareConfig {
  color?: string;
  width?: number;
  [propName: string]: any;
}

function createSquare(config: SquareConfig) {
  // ...
}

let mySquare = createSquare({ cx: "red", width: 100 });

interface SearchFunc {
  (source: string, subString: string): boolean;
}

let mySearch: SearchFunc;
mySearch = function(src: string, sub: string): boolean {
  let result = src.search(sub);
  return result > -1;
}


interface StringArray {
  [index: number]: string;
}

let myArray: StringArray = ["Bob", "Fred"];

let myStr: string = myArray[0];

class Animal {
  [index: string]: string;
}
class Dog extends Animal {
  breed: string;
}

// 错误：使用数值型的字符串索引，有时会得到完全不同的Animal!
// interface NotOkay {
//   [x: number]: Animal;
//   [x: string]: Dog;
// }

let a1: Animal = ['1', '2']