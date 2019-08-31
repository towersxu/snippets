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
            resolve({
              body: xhr.responseText, // todo: 转换为stream
              json: function () {
                return new Promise((resolve, reject) => {
                  resolve(JSON.parse(this.body))
                })
              },
              text: function () {
                return new Promise((resolve, reject) => {
                  resolve(this.body)
                })
              },
              blob: function () {},
              arrayBuffer: function () {},
              status: xhr.status,
              statusText: 'OK',
              url: xhr.responseURL,
              type: 'basic',
              ok: true
            })
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