// 在使用typescript写jsonp的时候遇到

let name = 'callback_' + Math.floor(Math.random() * 1000)
window[name] = function () {}

// 上面这种写法，因为name是动态的，无法通过typescript校验。
// 这是可以改成reflect来写

Reflect.defineProperty(window, name, function () {})