

class LruCache {
  constructor (limit = 10) {
    this.limit = limit
    this.head = this.tail = null
    this.size = 0
    this.keyMap = {}
  }
  put (key, val) {
    let item = this.get(key)
    if (!item) {
      item = {
        key: key,
        newer: null,
        older: this.head,
        val: val
      }
      if (this.head) {
        this.head.newer = item
      }
      this.head = item
      if (!this.tail) {
        this.tail = item
      }
      if (this.size === this.limit) {
        let key = this.tail.key
        this.keyMap[key] = undefined
        this.tail = this.tail.newer
      } else {
        this.size++
      }
      this.keyMap[key] = item
    }
    
  }
  get (key) {
    let item = this.keyMap[key]
    if (item) {
      // 如果item是最后一个，
      if (this.tail === item) {
        this.tail = this.tail.newer
      }
      if (item.newer) { // 如果不是最后一个
        item.newer.older = item.older
        item.newer = null
      }
      item.older = this.head // 成为第一个
      this.head = item
    }
    return item
  }
}

let cache = new LruCache()
cache.put('x', 11)
cache.put('x1', 12)
cache.put('x2', 13)
cache.put('x3', 14)
cache.put('x4', 14)
cache.put('x5', 14)
cache.put('x6', 14)
cache.put('x7', 14)
cache.put('x8', 14)
cache.put('x', 14)
cache.put('x9', 14)
cache.put('x0', 14)

console.log(cache.get('x'))