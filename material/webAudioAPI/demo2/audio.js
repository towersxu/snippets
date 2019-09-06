const AudioContext = window.AudioContext || window.webkitAudioContext;

class CAudioNode {
  constructor () {
    this.audioContext = new AudioContext()
    this.sourceNode = new CSourceNode(this.audioContext)
    this.jsNode = new CJsNode(this.audioContext)
    this.analyNode = new CAnalyNode(this.audioContext)
    this.gainNode = new CGainNode(this.audioContext)
    this.pannerNode = new CPannerNode(this.audioContext)
  }
  start(arrayBuffer) {
    this.audioContext.decodeAudioData(arrayBuffer, (buffer) => {
      this.playBuffer(buffer)
    })
  }
  playBuffer (buffer) {
    this.sourceNode.addBuffer(buffer)
    this.sourceNode.connect(this.jsNode).connect(this.pannerNode).connect(this.analyNode).connect(this.gainNode).connect(this.audioContext.destination)
    this.jsNode.listenAudioprocess(() => {
      this.analyNode.getByteTimeDomainData();
      this.analyNode.draw()
    })
  }
  addBuffer (buffer) {
    this.sourceNode.addBuffer(buffer)
  }
  stop() {
    this.sourceNode.stop()
    this.jsNode.stop()
  }
  playRandomSound (isAdd) {
    let channels = 1
    let frameCount = this.audioContext.sampleRate * 2
    let randomBuffer = this.audioContext.createBuffer(channels, frameCount, this.audioContext.sampleRate)
    let arr = [-0.5, -0.2, 0.3, 0.4, 0.5, 0.6, -0.1, -0.2, -0.1, -0.2, -0.3, -0.5,  -0.3, -0.5, 0.1, 0.3, 0.2, 0.23, -0.5, -0.2, 0.4, 0.5, 0.6,0.1, 0.2, 0.23]
    for (let channel = 0; channel < channels; channel++){
      var nowBuffering = randomBuffer.getChannelData(channel)
      for (let j = 0; j < frameCount; j++) {
        nowBuffering[j] = arr[j % 18];
      }
    }
    if (isAdd) {
      this.addBuffer(randomBuffer)
    } else {
      this.playBuffer(randomBuffer)
    }
  }
}

export default CAudioNode

class AudioNodeInterface {
  constructor() {
    this.node = ''
  }
  getNode () {
    return this.node
  }
  connect (node) {
    let prueNode = node
    if (node instanceof AudioNodeInterface) {
      prueNode = node.getNode()
    }
    this.node.connect(prueNode)
    return node
  }
}

class CSourceNode extends AudioNodeInterface {
  constructor (audioContext) {
    super()
    this.node = audioContext.createBufferSource()
  }
  addBuffer (buffer) {
    this.node.buffer = buffer
    this.start()
  }
  start () {
    this.node.start()
  }
  stop () {
    this.node.stop()
  }
}

// 
class CJsNode extends AudioNodeInterface {
  constructor (audioContext) {
    super()
    this.bufferSize = 2048
    this.numberOfInputChannels = 2
    this.numberOfOutputChannels = 2
    this.isInjectAudioprocess = false
    this.isInjectAudioprocessEverySample = false
    this.injectAudioprocess = function () { }
    this.injectAudioprocessEverySample = function () { }
    this.node = audioContext.createScriptProcessor(this.bufferSize, this.numberOfInputChannels, this.numberOfOutputChannels)
    this.node.onaudioprocess = this.onaudioprocess.bind(this)
  }
  onaudioprocess (audioProcessingEvent) {
    var inputBuffer = audioProcessingEvent.inputBuffer;
    var outputBuffer = audioProcessingEvent.outputBuffer;
    for (var channel = 0; channel < outputBuffer.numberOfChannels; channel++) {
      var inputData = inputBuffer.getChannelData(channel);
      var outputData = outputBuffer.getChannelData(channel);
      for (var sample = 0; sample < inputBuffer.length; sample++) {
        outputData[sample] = inputData[sample];
        if (this.isInjectAudioprocessEverySample) {
          outputData[sample] = this.injectAudioprocessEverySample(inputData[sample])
        }
      }
    }
    if (this.isInjectAudioprocess) {
      this.injectAudioprocess(audioProcessingEvent)
    }
  }
  listenAudioprocess (callback) {
    this.isInjectAudioprocess = true
    this.injectAudioprocess = callback
  }
  listenAudioprocessEverySample (callback) {
    this.isInjectAudioprocessEverySample = true
    this.injectAudioprocessEverySample = callback
  }
  stop () {
    this.node.disconnect()
  }
}

// 音频可视化
class CAnalyNode extends AudioNodeInterface {
  constructor(audioContext) {
    super()
    this.node = audioContext.createAnalyser()
    this.fftSize = 2048;
    this.node.fftSize = this.fftSize;
    this.dataArray = new Uint8Array(this.fftSize);
    this.ctx = document.getElementById('canvas').getContext("2d");
  }
  getDataArray () {
    return this.dataArray
  }
  getByteTimeDomainData () {
    this.node.getByteTimeDomainData(this.dataArray)
    return this.dataArray
  }
  draw () {
    requestAnimationFrame(() => {
      this.ctx.clearRect(0, 0, 512, 216);
      for (var i = 0; i < this.dataArray.length; i++) {
        var value = this.dataArray[i] / 256;
        var y = 216 - (216 * value) - 1;
        this.ctx.fillStyle = '#f1ffff';
        this.ctx.fillRect(i, y, 1, 1);
      }
    })
  }
}

// 音量
class CGainNode extends AudioNodeInterface {
  constructor (audioContext) {
    super()
    this.node = audioContext.createGain()
    this.setValue(0.5)
    this.initListener()
  }
  setValue (val) {
    this.node.gain.value = val
  }
  initListener () {
    let vol = document.getElementById('volume')
    let volValue = document.getElementById('volume-value')
    vol.addEventListener('input', () => {
      this.setValue(vol.value)
      volValue.innerText = vol.value
    })
  }
}

// 声音立体化处理
class CPannerNode extends AudioNodeInterface {
  constructor (audioContext) {
    super()
    this.audioContext = audioContext
    this.node = audioContext.createPanner()
    this.node.panningModel = 'HRTF'
    this.initListener()
  }
  setPositionX(val) {
    this.node.positionX.setValueAtTime(val, this.audioContext.currentTime)
  }
  setPositionY(val) {
    this.node.positionY.setValueAtTime(val, this.audioContext.currentTime)
  }
  initListener() {
    let panner = document.getElementById('panner')
    let pannerValue = document.getElementById('panner-value')
    panner.addEventListener('input', () => {
      this.setPositionX(panner.value)
      pannerValue.innerText = panner.value
    })
    let pannerY = document.getElementById('pannerY')
    let pannerYValue = document.getElementById('pannerY-value')
    pannerY.addEventListener('input', () => {
      this.setPositionY(pannerY.value)
      pannerYValue.innerText = pannerY.value
    })
  }
}
