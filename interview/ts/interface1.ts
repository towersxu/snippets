/**
 * 类静态部分与实例部分的区别
 */

interface ClockConstructor {
  new(hour: number, minute: number): ClockInterface1;
}

interface ClockInterface1 {
  tick();
}

interface createClockConstructor {
  ctor: ClockConstructor;
  hour: number;
  minute: number;
}

function createClock(c: createClockConstructor): ClockInterface1 {
  return new c.ctor(c.hour, c.minute);
}

class DigitalClock implements ClockInterface1 {
  constructor(h: number, m: number) { }
  tick() {
    console.log("beep beep");
  }
}

class AnalogClock implements ClockInterface1 {
  constructor(h: number, m: number) { }
  tick() {
    console.log("tick tock");
  }
}

let digital = new DigitalClock(12, 17);

let c: createClockConstructor= {
  ctor: AnalogClock,
  hour: 7,
  minute: 32
}
let analog = createClock(c);

/**
 * 一个接口可以继承多个接口，创建出多个接口的合成接口。
 */

interface Shape {
  color: string;
}

interface PenStroke {
  penWidth: number;
}

interface Square extends Shape, PenStroke {
  sideLength: number;
}

let square = <Square>{};
square.color = "blue";
square.sideLength = 10;
square.penWidth = 5.0;