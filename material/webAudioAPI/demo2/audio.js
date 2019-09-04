const AudioContext = window.AudioContext || window.webkitAudioContext;

class CAudioNode {
  constructor () {
    this.audioContext = new AudioContext()
    this.sourceNode = new CSourceNode(this.audioContext)
    this.jsNode = new CJsNode(this.audioContext)
  }
  start(arrayBuffer) {
    this.audioContext.decodeAudioData(arrayBuffer, (buffer) => {
      this.sourceNode.addBuffer(buffer)
      this.sourceNode.connect(this.jsNode).connect(this.audioContext.destination)
    })
  }
  stop() {
    this.sourceNode.stop()
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
    if (node instanceof AudioNodeInterface) {
      console.log(node)
      node = node.getNode()
    }
    this.node.connect(node)
    return this
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

class CJsNode extends AudioNodeInterface {
  constructor (audioContext) {
    super()
    this.bufferSize = 2048
    this.numberOfInputChannels = 1
    this.numberOfOutputChannels = 1
    this.node = audioContext.createScriptProcessor(this.bufferSize, this.numberOfInputChannels, this.numberOfOutputChannels)
    this.node.onaudioprocess = this.onaudioprocess
  }
  onaudioprocess (audioProcessingEvent) {
    console.log(11)
    var inputBuffer = audioProcessingEvent.inputBuffer;
    var outputBuffer = audioProcessingEvent.outputBuffer;
    for (var channel = 0; channel < outputBuffer.numberOfChannels; channel++) {
      var inputData = inputBuffer.getChannelData(channel);
      var outputData = outputBuffer.getChannelData(channel);
      for (var sample = 0; sample < inputBuffer.length; sample++) {
        outputData[sample] = inputData[sample];
        outputData[sample] += ((Math.random() * 2) - 1) * 0.4;
      }
    }
  }
}
