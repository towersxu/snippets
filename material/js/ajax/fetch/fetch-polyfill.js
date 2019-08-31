// if (!window.fetch) {
  window.fetch1 = function (url, config) {
    config = Object.assign({
      body: "",
      method: 'GET',
      headers: {
        'content-type': 'application/json'
      }
    }, config)
    return new Promise((resolve, reject) => {
      var xhr = new XMLHttpRequest()
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          if (xhr.status >= 200 && xhr.status < 300) {
            resolve(JSON.parse(xhr.responseText))
          } else {
            reject(xhr)
          }
        }
      }
      xhr.open(config.method, url)
      for (header in config.headers) {
        xhr.setRequestHeader(header, config[header])
      }
      xhr.send(config.body)
    })
  }
// }