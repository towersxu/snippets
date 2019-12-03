let sender = 'xutao';
let reciver = 'xxdu';

let s = SaferHTML`<p>${sender} has send ${reciver} a message</p>`

function SaferHTML (strs, ...value) {
  console.log(strs)
  console.log(value)
}