class Point {
  ae = 2;
  static asx = 3;
  getName () {
    return 3333 + this.ae
  }
  getClassName () {
    return Point.name
  }
  static getName () {
    return 444 + this.asx
  }
  static getAge () {
    return this.getName()
  }
  constructor() {
    this.namex = 'xxx'
  }
}

Object.assign(Point.prototype, {
  toString() { },
  time: 333
})

let p = new Point()
console.log(p.getName())
console.log(Object.getOwnPropertyDescriptors(p))
console.log(Point.getAge())