// 要求设计 LazyMan 类，实现以下功能。
/**
  LazyMan('Tony');
  // Hi I am Tony

  LazyMan('Tony').sleep(10).eat('lunch');
  // Hi I am Tony
  // 等待了10秒...
  // I am eating lunch

  LazyMan('Tony').eat('lunch').sleep(10).eat('dinner');
  // Hi I am Tony
  // I am eating lunch
  // 等待了10秒...
  // I am eating diner

  LazyMan('Tony').eat('lunch').eat('dinner').sleepFirst(5).sleep(10).eat('junk food');
  // Hi I am Tony
  // 等待了5秒...
  // I am eating lunch
  // I am eating dinner
  // 等待了10秒...
  // I am eating junk food
 */
class Man {
  constructor() {
    return (name) => {
      console.log(`Hi I am ${name}`)
      this.actionList = []
      setTimeout(() => {
        this.do()
      }, 0);
      return this
    }
  }
  async do () {
    for (let action of this.actionList) {
      await action()
    }
  }
  eat (something) {
    this.actionList.push(() => {
      console.log(`I am eating ` + something)
    })
    return this
  }
  delay (timer) {
    return () => {
      return new Promise((resolve) => {
        console.log('等待了' + timer + '秒')
        setTimeout(() => {
          resolve()
        }, timer * 1000)
      })
    }
  }
  sleep (timer) {
    this.actionList.push(this.delay(timer))
    return this
  }
  sleepFirst (timer) {
    this.actionList.unshift(this.delay(timer))
    return this
  }
}

let LazyMan = new Man()
LazyMan('Tony').eat('lunch').eat('dinner').sleepFirst(5).sleep(10).eat('junk food');
