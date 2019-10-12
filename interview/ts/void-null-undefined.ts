/**
 * 1) 当一个函数没有返回值时，你通常会见到其返回值类型是 void
 * 
 * 2) 声明一个void类型的变量没有什么大用，因为你只能为它赋予undefined和null
 */

let unusable: void = undefined;

function warnUser() {
  console.log("This is my warning message");
}


/**
 * undefined和null两者各自有自己的类型分别叫做undefined和null
 */

let u: undefined = undefined;
let n: null = null;

/**
 * 默认情况下null和undefined是所有类型的子类型。 
 * 就是说你可以把 null和undefined赋值给number类型的变量。
 */
let age: number = u;
console.log(age);
/**
 * 上面这种情况不好，在实际项目中，我们常常指定`--strictNullChecks`标记，来限制将
 * null和undefined只能赋值给void和它们各自。
 * 如果想要传入一个 string或null或undefined
 * 可以使用联合类型string | null | undefined。
 */

interface T {
  a: Number,
  b: String,
  c?: any
}
const obj: T = {
  a: 1,
  b: 'string'
};

obj.c = null;
