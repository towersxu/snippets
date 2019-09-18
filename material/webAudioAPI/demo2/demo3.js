import CAudioNode from './audio.js'

// let url = '../audio/music.mp3'
let url = '../audio/Tonight_I_Feel_Close_To_You.mp3'
// let url = '../audio/piano.mp3'

function loadMusic(url) {
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
function play() {
  loadMusic(url)
    .then((arrayBuffer) => {
      var arr = new Uint8Array(arrayBuffer);
      var str = [];
      for (let i = 0; i < 3; i++) {
        str.push(String.fromCharCode(arr[i]));
      }
      var majar = arr[3]; // /*版本号;ID3V2.3就记录03,ID3V2.4就记录04*/
      // arr[4,5] ->  /*副版本号;此版本记录为00*/
      /**
       * The ID3v2 tag/frame size is encoded with four bytes where the most
       * significant bit (bit 7) is set to zero in every byte, making a total of 28
       * bits. The zeroed bits are ignored, so a 257 bytes long tag is represented
       * as $00 00 02 01.
       */
      var size1 = arr[6]
      var size2 = arr[7];
      var size3 = arr[8];
      var size4 = arr[9]; // 0x7f = 0b01111111

      var size = size4 & 0x7f | (size3 & 0x7f) << 7 | (size2 & 0x7f) << 14 | (size1 & 0x7f) << 21;
      console.log(size)
    })
}

document.getElementById('play').addEventListener('click', function () {
  play();
})
