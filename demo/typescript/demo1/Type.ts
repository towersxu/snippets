let isDone: boolean = false;
debugger
let hexLiteral: number = 0xf00d;
let decLiteral: number = 6;
let binaryLiteral: number = 0b1010;

let list: number[] = [1, 2, 3]

let list1: any[] = [1, 'x', 3]

let x: [string, [number, number, any[]]] = ['x', [1, 2, []]]

let y = x[1][2][111] // undefined

enum Color { Red, Green, Blue }

function warnUser(): void {
  console.log("This is my warning message");
}
let unusable: void = undefined;
let u: undefined = undefined;
let n: null = null;

// never类型表示的是那些永不存在的值的类型。
// 例如，never类型是那些总是会抛出异常或根本就不会有返回值的函数表达式或箭头函数表达式的返回值类型；
// 变量也可能是never类型，当它们被永不为真的类型保护所约束时。

function error(message: string): never {
  throw new Error(message);
}

// 返回never的函数必须存在无法达到的终点
function infiniteLoop(): never {
  while (true) {
  }
}

let someValue: any = "this is a string";

let strLength: number = (<string>someValue).length;
// 两种形式是等价的。 至于使用哪个大多数情况下是凭个人喜好；然而，当你在TypeScript里使用JSX时，只有as语法断言是被允许的。
let strLength1: number = (someValue as string).length;

function keepWholeObject(wholeObject: { a: string, b?: number }) {
  let { a, b = 1001 } = wholeObject;
}

