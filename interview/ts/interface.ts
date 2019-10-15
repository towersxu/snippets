/**
 * 使用interface声明全局变量
 */
interface Window {
  dd: any;
}

/**
 * 声明函数
 */
interface SearchFunc {
  (name: string, type: number): boolean;
}

let search: SearchFunc;
search = function (source: string, subString: number) {
  let result = source.substr(subString);
  return !!result.length;
}

/**
 * 与使用接口描述函数类型差不多，我们也可以描述那些能够“通过索引得到”的类型
 */

interface School {
  name: string;
  studentNumber: number;
}

interface SchoolList {
  [index: number]: School;
}

/**
 * typeScript支持两种索引签名：字符串和数字。
 * 可以同时使用两种类型的索引
 * 但是数字索引的返回值必须是字符串索引返回值类型的子类型。
 */

interface NumberDictionary {
  [index: number]: number;
  length: number;    // 可以，length是number类型
  // name: string       // 错误，`name`的类型与索引类型返回值的类型不匹配
}

/**
 * TypeScript也能够用它来明确的强制一个类去符合某种契约。
 * 接口描述了类的公共部分，而不是公共和私有两部分。
 * 它不会帮你检查类是否具有某些私有成员。
 */

interface ClockInterface {
  currentTime: Date;
  setTime(d: Date);
}

class Clock implements ClockInterface {
  currentTime: Date;
  setTime(d: Date) {
    this.currentTime = d;
  }
  constructor(h: number, m: number) { }
}

