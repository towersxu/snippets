let map = new Map([['name', 'xx']])

map.set(Symbol(), 333)
map.set({}, 3133)

console.log(map)