function MV(options) {
  this.el = options.el
  this.template = options.template
  this.data = options.data()
  observe(this.data)
  compile(this.template, this.data, this.el)
}
