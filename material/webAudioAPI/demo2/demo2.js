import CAudioNode from './audio.js'

// console.log(CAudioNode)

let url = '../audio/music.mp3'


const AudioContext = window.AudioContext || window.webkitAudioContext;

let audioContext
window.requestAnimFrame = (function () {
  return window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    function (callback, element) {
      window.setTimeout(callback, 1000 / 60);
    };
})();

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

function addSourceNode (buffer, nextNode) {
  var sourceNode = audioContext.createBufferSource();
  sourceNode.buffer = buffer;
  sourceNode.start();
  if (nextNode) {
    sourceNode.connect(nextNode)
  } else {
    sourceNode.connect(audioContext.destination);
  }
  return sourceNode;
}
var dataArray;
var analyserNode;
function addAnalyNode(nextNode) {
  analyserNode = audioContext.createAnalyser();
  analyserNode.fftSize = 2048;
  var bufferLength = analyserNode.fftSize;
  dataArray = new Uint8Array(bufferLength);
  if (nextNode) {
    analyserNode.connect(nextNode);
  } else {
    analyserNode.connect(audioContext.destination);
  }
  return analyserNode;
}

function addJavascriptNode(nextNode) {
  var scriptNode = audioContext.createScriptProcessor(2048, 1, 1);
  scriptNode.onaudioprocess = function (audioProcessingEvent) {
    var inputBuffer = audioProcessingEvent.inputBuffer;
    var outputBuffer = audioProcessingEvent.outputBuffer;
    for (var channel = 0; channel < outputBuffer.numberOfChannels; channel++) {
      var inputData = inputBuffer.getChannelData(channel);
      var outputData = outputBuffer.getChannelData(channel);
      for (var sample = 0; sample < inputBuffer.length; sample++) {
        outputData[sample] = inputData[sample];
        // outputData[sample] += ((Math.random() * 2) - 1) * 0.2;
      }
    }
    analyserNode.getByteTimeDomainData(dataArray);
    // console.log(1)
    requestAnimFrame(drawTimeDomain);
  }
  if (nextNode) {
    scriptNode.connect(nextNode);
  } else {
    scriptNode.connect(audioContext.destination);
  }
}
var ctx = document.getElementById('canvas').getContext("2d");
var barHeight
var barWidth = 10
var HEIGHT=216
var x = 0;
function drawTimeDomain() {
  clearCanvas();
  for (var i = 0; i < dataArray.length; i++) {
    var value = dataArray[i] / 256;
    var y = 216 - (216 * value) - 1;
    ctx.fillStyle = '#0f01ff';
    ctx.fillRect(i, y, 1, 1);
    x += barWidth + 1;
  }
}
function clearCanvas() {
  ctx.clearRect(0, 0, 512, 216);
}
let cAudioNode
function play () {
  loadMusic(url)
  .then((arrayBuffer) => {
    cAudioNode = new CAudioNode();
    cAudioNode.start(arrayBuffer);
  })
}

document.getElementById('play').addEventListener('click', function () {
  play();
})
document.getElementById('stop').addEventListener('click', function () {
  cAudioNode.stop();
})