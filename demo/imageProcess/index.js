(function () {
  let fileEl = document.getElementById('file')
  fileEl.addEventListener('change', function (e) {
    let file = e.target.files[0]
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function (e) {
      document.getElementById('image1').setAttribute('src', this.result)
      rotateImg(this.result)
    }
  })

  function rotateImg (img) {
    var canvas = document.createElement("canvas");
    let image = new Image()
    image.onload = function () {
      canvas.height = this.height;
      canvas.width = this.width;
      var ctx = canvas.getContext("2d");
      // 旋转180deg的方法
      // 方法1：先将绘制原点设置为右下角，然后旋转180度，从原点开始绘制
      // ctx.translate(this.width, this.height);
      // ctx.rotate(Math.PI / 180 * 180);
      // ctx.drawImage(this, 0, 0);
      // 方法2：直接旋转180度，然后再离原点偏左图片宽度偏上图片高度位置开始绘制。
      ctx.rotate(Math.PI / 180 * 180)
      ctx.drawImage(this, -this.width, -this.height)
      var base = canvas.toDataURL("image/jpeg");
      document.getElementById('image2').setAttribute('src', base)
    }
    image.src = img
  }
})()