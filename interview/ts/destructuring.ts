/**
 * ts可以在解构的时候进行类型指定
 */

let o = {
  a: 'xx',
  b: 1,
  c: [ 1, 2 ]
}

let { a: name1, b: age1 }: { a: string, b: number } = o;

console.log(name1, age1)