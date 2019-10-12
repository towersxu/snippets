interface SquareConfig {
  color?: string;
  width?: number;
}

function createSquare(config: SquareConfig): { color: string; area: number } {
  return {
    color: config.color,
    area: config.width * config.width
  }
}

let mySquare = createSquare({ colour: "red", width: 100 } as SquareConfig);
let mySquare1 = createSquare({ width: 100 });
// 下面的代码会报错，因为SquareConfig没有c属性。
// let mySquare2 = createSquare({ width: 100, c: 11 });
// 可以设置[propName: string]: any;