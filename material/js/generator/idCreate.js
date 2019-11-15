/**
 * generator使用实例1
 */
function * idCreator () {
  let i = 0;
  while (true) yield i++;
}

const ids = idCreator();

console.log(ids.next().value)
console.log(ids.next().value)
console.log(ids.next().value)
