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