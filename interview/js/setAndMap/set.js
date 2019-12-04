let a = new Set([1, 2, 3]);
let b = new Set([5, 4, 3, 2]);

// 并集
let union = new Set([...a, ...b]);
// Set {1, 2, 3, 4}

// 交集
let intersect = new Set([...a].filter(x => b.has(x)));
// set {2, 3}

// A与B的差集
let difference = new Set([...a].filter(x => !b.has(x)));

console.log(union, intersect, difference)