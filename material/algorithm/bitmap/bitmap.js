class BitMap {
  constructor (nbits) {
    this.nbits = nbits
    this.bytes = []
  }
  set (k) {
    if (k > this.nbits) return
    let byteIndex = Math.floor(k / 16)
    let bitIndex = k % 16
    this.bytes[byteIndex] = this.bytes[byteIndex] | (1 << bitIndex)
  }
  get (k) {
    if (k > this.nbits) return
    let byteIndex = Math.floor(k / 16)
    let bitIndex = k % 16
    return (this.bytes[byteIndex] & (1 << bitIndex)) != 0;
  }
}

let bm = new BitMap(100000000)
// bm.set(1)
bm.set(33)
console.log(bm.get(32))
// console.log(bm.get(64888888))
// console.log(bm.get(888))
// console.log(bm.get(64888887))