function MaxArea (h) {
  let max = 0
  let l = 0
  let r = h.length - 1
  while (l < r) {
    if (h[r] > h[l]) {
      max = Math.max(max, h[l] * (r - l))
      l++
    } else {
      max = Math.max(max, h[r] * (r - l))
      r--
    }
  }
  return max
}

let height = [2, 3, 4, 5, 18, 17, 6];

console.log(MaxArea(height))