function compile(template, data, el) {
  // 将template中需要绑定的属性识别出来。
  var attrs = template.match(/(?<=\{\{)(.*?)(?=\}\})/g)
  attrs.map((attr) => {
    let res = data[attr]
    if (Dep.target) {
      Dep.target.addSub(function (val) {
        console.log('replace', attr, val)
        var html = template.replace('{{' + attr + '}}', val)
        el.innerHTML = html
      })
      Dep.target.update(res)
    }
  })
}