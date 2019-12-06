async function* createAsyncIterable(iterable) {
  for (const elem of iterable) {
    yield elem;
  }
}
function getName () {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(3000)
    }, 3000)
  })
}
function getAge() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(4000)
    }, 8000)
  })
}
const asyncIterable = createAsyncIterable([getName(), getAge()]);
console.log(asyncIterable)
console.log(Symbol.asyncIterator)
// const asyncIterator = asyncIterable[Symbol.asyncIterator]();
// async function f () {
//   console.log(await asyncIterator.next())
//   console.log(await asyncIterator.next())
//   console.log(await asyncIterator.next())
// }
// f()
async function f() {
  for await (const x of asyncIterable) {
    console.log(x);
  }
}
f()
