
// complie
// 将template中获取需要响应式的内容。然后通过订阅-发布；data的set触发发布.
// 订阅-发布和get, set有什么关系？
// 当在template中获取到需要响应式属性的时候，通过data[attr]的方式，触发get
// 在get中将当前订阅-发布对象绑定到Dep.target上
//（利用闭包: 在defineProperty的时候，为这个对象初始化一个订阅发布对象. 
// 一个属性就对应着一个订阅发布对象，因为template中可能一个响应式属性多个地方用到。
// 这就是为什么用订阅-发布模式）
// 然后添加订阅。
// 在data的属性发生了变化后，触发set。
// 判断set触发后，判断val
function compile(template, data, el) {
  // 将template中需要绑定的属性识别出来。
  var attrs = template.match(/(?<=\{\{)(.*?)(?=\}\})/g)
  attrs.map((attr) => {
    let res = data[attr]
    if (Dep.target) {
      Dep.target.addSub(function (val) {
        var html = template.replace('{{' + attr + '}}', val)
        el.innerHTML = html
      })
      Dep.target.update(res)
    }
  })
}