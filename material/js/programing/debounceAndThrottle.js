/**
 * Debounce a function so it only gets called after the
 * input stops arriving after the given wait period.
 *
 * @param {Function} func
 * @param {Number} wait
 * @return {Function} - the debounced function
 */

function debounce(func, wait) {
  var timeout, args, context, timestamp, result
  var later = function () {
    var last = Date.now() - timestamp
    if (last < wait && last >= 0) {
      timeout = setTimeout(later, wait - last)
    } else {
      timeout = null
      result = func.apply(context, args)
      if (!timeout) context = args = null
    }
  }
  return function () {
    context = this
    args = arguments
    timestamp = Date.now()
    if (!timeout) {
      timeout = setTimeout(later, wait)
    }
    return result
  }
}

function throttle(func, wait) {
  var isDelay = false
  return function () {
    if (!isDelay) {
      func()
      isDelay = true;
      setTimeout(() => {
        isDelay = false;
      }, wait)
    }
  }
}

var t = throttle(function () {
  console.log('throttle')
}, 3000);

setInterval(function () {
  t();
}, 500)