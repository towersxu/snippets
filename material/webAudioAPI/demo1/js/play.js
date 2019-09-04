function playBuffer(buffer) {

}

/**
 * 创建audio context
 */
function createAudioContext () {
  var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  return audioCtx
}
/**
 * 音频环境AudioContext 接口的 createBuffer() 方法
 * 用于新建一个空白的 AudioBuffer 对象，
 * 以便用于填充数据，通过 AudioBufferSourceNode 播放。
 * @param {*} context - audio context
 * @param {number} channels - 声频通道数量
 * @param {number} frameCount - 一个代表 buffer 中的样本帧数的整数
 * @param {number} sampleRate - 采样率
 */
function createContextBuff(context, channels = 2, frameCount = 22050, sampleRate = 44100 ) {
  var buffer = context.createBuffer(channels, frameCount, sampleRate);
  return buffer
}