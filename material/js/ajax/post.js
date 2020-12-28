/**
 * @keywords post xmlHttpRequest ajax
 * xmlHttpRequest中POST传输数据的几种方式
 */

/**
 * 方法一，application/x-www-form-urlencoded
 * 这应该是最常见的 POST 提交数据的方式了。
 * 浏览器的原生 <form> 表单，如果不设置 enctype 属性，
 * 那么最终就会以 application/x-www-form-urlencoded 方式提交数据。
 */
function post () {
  let xhr = new XMLHttpRequest()
  xhr.open('POST', params.url)
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
  /**
   * 注意：application/x-www-form-urlencoded格式上传内容的时候，
   * 要求数据以name=1&age=2的形式传递。
   * 在chrome的网络中会在Form Data看到。parse后是
   * name: 1
   * age: 2
   * 在axios中可以用qs来进行统一处理
   * @example
   * import qs from 'qs'
   * axios.interceptors.request.use((request) => {
   *   if (request.data && request.headers['Content-Type'] === 'application/x-www-form-urlencoded') {
   *     request.data = qs.stringify(request.data, { allowDots: true })
   *   }
   *   return request
   * })
   */
  xhr.send('name=1&age=2')
}

/**
 * multipart/form-data
 * 这又是一个常见的 POST 数据提交的方式。
 * 我们使用表单上传文件时，必须让 <form> 表单的 enctype 等于 multipart/form-data。
 * IE10以后，支持js中上传文件,因为他实现了
 * xmlHttpRequest level2(XHR Advanced Features)中，支持FormData。
 * @see https://www.ietf.org/rfc/rfc1867.txt
 */

function postFile(params) {
  var formData = new FormData();
  formData.append("attach", file);
  formData.append("userId", 'xxxxxxx');

  var xhr = new XMLHttpRequest();
  xhr.onprogress = params.progress;
  xhr.onload = params.load;
  if (xhr.upload && params.progress) {
    xhr.upload.onprogress = throttle(function (data) {
      if (xhr.readyState === 1) {
        let progress = Math.ceil(data.loaded / data.total * 100) + '%'
        params.progress(progress, data.loaded)
      }
    }, 200)
    xhr.upload.onloadstart = params.loadStart
    xhr.upload.onloadEnd = params.loadEnd
    xhr.upload.onerror = params.error
    xhr.upload.onabort = params.abort
  }
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status >= 200 && xhr.status < 300) {
        let res
        try {
          res = JSON.parse(xhr.responseText)
        }
        catch (e) {
          res = xhr.responseText
        }
        // todo: 这里可能有不返回100%情况。
        params.progress('100%') // 因为在进度里面做了throttle，并且延迟了200ms，所以可能出现无法返回正确进度。
        params.success(res)
      }
      else {
        params.error(xhr)
      }
    }
  }
  xhr.open("POST", params.url);
  xhr.send(formData)
}

/**
 * application/json
 * application/json 这个 Content-Type 作为响应头大家肯定不陌生。
 * 实际上，现在越来越多的人把它作为请求头，用来告诉服务端消息主体是序列化后的 JSON 字符串。
 * 由于 JSON 规范的流行，除了低版本 IE 之外的各大浏览器都原生支持 JSON.stringify，
 * 服务端语言也都有处理 JSON 的函数，使用 JSON 不会遇上什么麻烦。
 * 
 */

function postJson () {
  let xhr = _createXhr()
  xhr.open('POST', params.url)
  xhr.setRequestHeader('Content-Type', 'application/json')
  xhr.send(JSON.stringify(params.data))
}

/**
 * text/plain
 * 这种就是使用xmlHttpRequest默认的数据提交方式
 * 在chrome中看起来，send的数据放到request Payload中
 */

function postJson() {
  let xhr = _createXhr()
  xhr.open('POST', params.url)
  xhr.send('hello world')
}

/**
 * 跨域请求
 * 如果跨域服务器需要校验请求合法性，一般要求前端发起ajax请的时候带上withCredentials
 * XMLHttpRequest.withCredentials  属性是一个Boolean类型，
 * 它指示了是否该使用类似cookies,authorization headers(头部授权)
 * 或者TLS客户端证书这一类资格证书来创建一个跨站点访问控制（cross-site Access-Control）请求。
 * 在同一个站点下使用withCredentials属性是无效的。
 * 
 * 当配置了xhr.withCredentials = true时，
 * 必须在后端增加 response 头信息Access-Control-Allow-Origin，
 * 且必须指定域名，而不能指定为*。
 */
function corsGet() {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'http://example.com/', true);
  xhr.withCredentials = true;
  xhr.send(null);
}
