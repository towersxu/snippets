function Person() {
  if (!new.target) {
    throw new Error('xxx')
  }
}

function Tes() {
  if (!(this instanceof Tes)) {
    throw new Error('44')
  }
}
// Person()

new Tes()