interface Point {
  readonly x: number;
  readonly y: number;
}

function getArea (point: Point): number {
  // point.x = point.x * point.x; // error
  return point.x * point.y;
}

let a: number[] = [1, 2, 3, 4];
let b: ReadonlyArray<number> = a;
let c: number[];
let d: ReadonlyArray<number>;
console.log(b[1]); // 2
a[1] = 10;
// 说明： ReadonlyArray还是在编译阶段进行的现在，
// 并不会复制成一个新的数组,
// 所以修改a仍然会影响b
console.log(b[1]); // 10, 

// b[1] = 2; // error
// c = b; // error
d = b; // 没问题，说明readonly的array可以赋值给同样类型的变量