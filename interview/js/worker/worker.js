onmessage = function (e) {
  let file = e.data
  let fd = new FileReader()
  let data_url = 'data:text/plain;base64,MTIzNDU2Nzg5MGFiYwo='
  var offscreen = new OffscreenCanvas(256, 256);
  var gl = offscreen.getContext('webgl');
  console.log(gl)
  fd.onload = function (e) {
    if (e.target.readyState == FileReader.DONE) {
      console.log(e.target.result)
      let uint8_array = new Uint8Array(e.target.result)
      console.log(uint8_array)
    }
  }
  fd.readAsArrayBuffer(file)
  // fd.readAsDataURL(file)
  var worker = new Worker('worker2.js');
}