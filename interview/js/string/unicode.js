let a = '\u{0070}\u{40}';
let b = '\uD842\uDFB7'
let c = '\u{20BB7}'
console.log(a)
console.log(b)
console.log(c)
let x = 0xD842
let y = 0xDFB7
let name = '\u{80e5}\u{6d9b}'
console.log((x + y).toString(16))
console.log(name)
console.log('\uD842\uDFB7' === '\u{20BB7}')

let c1 = "n好🚀✈️🚢"
let code = c1.codePointAt(0)
console.log(code)
console.log(String.fromCodePoint(128640))

console.log(c1.length)
console.log([...c1].length)

let e = "é"
console.log(e.codePointAt(0))
console.log('e'.codePointAt(0))