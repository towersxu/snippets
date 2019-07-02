/**
 * 获取url上的参数，包括query和search上面的参数
 */
export default function getParams () {
  let params = {}
  let search = window.location.search
  if (search && search.length > 1) {
    search = search.substr(1)
    let searchs = search.split('&')
    searchs.forEach((param) => {
      let keyVal = param.split('=')
      params[keyVal[0].toLocaleLowerCase()] = keyVal[1]
    })
  }
  let hash = window.location.hash
  if (hash) {
    let result = hash.match(/(\w+)=(\w+)/g)
    if (result && result.length > 0) {
      result.forEach(function (r) {
        let kv = r.split('=')
        params[kv[0].toLocaleLowerCase()] = kv[1]
      })
    }
  }
  return params
}