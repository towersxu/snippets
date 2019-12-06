function* f() {
  let r = yield (2 + 3);
  console.log(r); // 4
  let error = false;
  try {
    yield 3;
    console.log('do yield 3')
  } catch (e){
    error = true
    console.log('error from yield 3', e)
  }
  if (error) {
    yield 4
    console.log('do yield 4')
  } else {
    yield 6
    console.log('do yield 6')
  }
  yield 7
}
var g = f();
g.next()
g.next(4)
g.throw(88)
g.next()
g.throw(33)
