/**
 * 有时候遇到这样的情况，比如你比TypeScript更了解某个值的详细信息。
 * 通常这会发生在你清楚地知道一个实体具有比它现有类型更确切的类型。
 * 这个时候可以通过“类型断言“来告诉编译器。
 * 
 * 类型断言好比其它语言里的类型转换，
 * 但是不进行特殊的数据检查和解构。 
 * 它没有运行时的影响，只是在编译阶段起作用。
 */

let someValue: any = "this is a string";

let strLength: number = (<string>someValue).length;

// 类型断言有尖括号和as两种用法，在jsx中只能使用as语法

let someValue1: any = "this is a string";

let strLength1: number = (someValue as string).length;