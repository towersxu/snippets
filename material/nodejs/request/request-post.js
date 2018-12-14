/**
 * @keywords request
 * 使用request请求post
 */
request({
  url: 'http://10.4.86.4:4000/upload/checkFileMd5',
  method: 'POST',
  headers: {
    "Content-type": "application/json"
  },
  json: jsonData
}, function (err, response, body) {})