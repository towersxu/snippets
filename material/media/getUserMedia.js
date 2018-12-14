/**
 * @keywords MediaStream API
 * 调用摄像头，显示页面
 */
(function () {
  let currentStream = '';
  function getMedia() {
    let constraints = { audio: true, video: true };
    navigator.mediaDevices.getUserMedia(constraints)
      .then(function (stream) {
        playInVideo(stream);
        currentStream = stream;
      })
      .catch(function (err) {
        /* 处理error */
        console.log(err);
      });
  }
  function stopMedia() {
    if (currentStream) {
      let tracks = currentStream.getTracks();

      tracks.forEach(function (track) {
        track.stop();
      });
    }
  }
  function playInVideo(stream) {
    let video = document.getElementById('video');
    if ('srcObject' in video) {
      video.srcObject = stream;
    } else {
      // 防止再新的浏览器里使用它，应为它已经不再支持了
      video.src = window.URL.createObjectURL(stream);
    }
    video.onloadedmetadata = function (e) {
      video.play();
    };
  }
  document.getElementById('btn-start').addEventListener('click', function () {
    getMedia();
  });
  document.getElementById('btn-stop').addEventListener('click', function () {
    stopMedia();
  });
})();