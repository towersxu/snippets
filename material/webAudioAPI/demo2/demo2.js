import CAudioNode from './audio.js'

// let url = '../audio/music.mp3'
// let url = '../audio/Tonight_I_Feel_Close_To_You.mp3'
let url = '../audio/demo3.emp3'
// let url = '../audio/piano.mp3'

function loadMusic (url) {
  return new Promise((resolve, reject) => {
    fetch(url)
      .then(function (response) {
        response.arrayBuffer().then((arraybuffer) => {
          resolve(arraybuffer)
        })
      })
  })
}

let cAudioNode
function play () {
  loadMusic(url)
  .then((arrayBuffer) => {
    var arr = new Uint8Array(arrayBuffer);
    // var str = [];
    // 解码示例
    for (let i = 0; i < arr.length; i++) {
      arr[i] = arr[i] ^ 0x11
    }
    cAudioNode = new CAudioNode();
    cAudioNode.start(arr.buffer);
  })
}

document.getElementById('play').addEventListener('click', function () {
  play();
})
document.getElementById('stop').addEventListener('click', function () {
  cAudioNode.stop();
})
let cAudioNode1
document.getElementById('randomSound').addEventListener('click', function () {
  cAudioNode1 = new CAudioNode();
  cAudioNode1.playRandomSound()
})

document.getElementById('addSound').addEventListener('click', function () {
  cAudioNode1.playRandomSound(true)
})
