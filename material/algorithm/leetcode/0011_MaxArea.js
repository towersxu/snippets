function MaxArea (h) {
  let max = 0
  let l = 0
  let r = h.length - 1
  while (l < r) {
    max = Math.max(max, Math.min(h[l], h[r]) * (r - l))
    if (h[r] > h[l]) {
      l++
    } else {
      r--
    }
  }
  return max
}

let height = [2, 3, 4, 5, 18, 17, 6];

console.log(MaxArea(height))