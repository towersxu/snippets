import SparkMD5 from 'spark-md5'

/**
 * 截取流
 * @param {blob} blob 流对象
 * @param {number} startByte 截取开始部分
 * @param {number} endByte 截取结束部分
 */
function blobSlice(blob, startByte, endByte) {

  if (blob.slice) {
    return blob.slice(startByte, endByte)
  }
  // 兼容firefox
  if (blob.mozSlice) {
    return blob.mozSlice(startByte, endByte)
  }
  // 兼容webkit
  if (blob.webkitSlice) {
    return blob.webkitSlice(startByte, endByte)
  }
  return null
}

/**
 * 读取文件的流
 * @param {file} file 文件
 * @param {number} start 开始读取的位置
 * @param {number} end 结束读取的位置
 * @param {fn} cb 回调函数
 */
export function readFileBlob(file, start, stop, cb) {
  if (typeof start === 'function') {
    cb = start
    start = 0
    stop = file.size - 1
  }
  let reader = new FileReader()
  let blob = blobSlice(file, start, stop)
  reader.readAsArrayBuffer(blob)
  reader.onloadend = function (e) {
    if (e.target.readyState === FileReader.DONE) {
      cb(reader.result)
    }
  }
}

export function readFileText(file, start, stop, cb) {
  if (typeof start === 'function') {
    cb = start
    start = 0
    stop = file.size - 1
  }
  let reader = new FileReader()
  let blob = blobSlice(file, start, stop)
  reader.readAsText(blob)
  reader.onloadend = function (e) {
    if (e.target.readyState === FileReader.DONE) {
      cb(reader.result)
    }
  }
}

export function readFileBinary(file, start, stop, cb) {
  if (typeof start === 'function') {
    cb = start
    start = 0
    stop = file.size - 1
  }
  let reader = new FileReader()
  let blob = blobSlice(file, start, stop)
  reader.readAsBinaryString(blob)
  reader.onloadend = function (e) {
    if (e.target.readyState === FileReader.DONE) {
      cb(reader.result)
    }
  }
}

/**
 * 使用sparkMD5获取文件的md5值。
 * @param {*} file file对象
 * @param {*} cb 回调函数
 */
export function getFileMd5(file, cb) {
  let chunkSize = 1024 * 1024 * 2
  let chunks = Math.ceil(file.size / chunkSize)
  let currentChunk = 0
  let spark = new SparkMD5.ArrayBuffer()
  let fileReader = new FileReader()

  fileReader.onload = function (e) {
    spark.append(e.target.result)
    currentChunk++

    if (currentChunk < chunks) {
      loadNext()
    } else {
      cb(spark.end())
    }
  }

  fileReader.onerror = function () { }

  function loadNext() {
    let start = currentChunk * chunkSize
    let end = ((start + chunkSize) >= file.size) ? file.size : start + chunkSize

    fileReader.readAsArrayBuffer(blobSlice(file, start, end))
  }

  loadNext()
}

