
export default {
  /**
   * 获取文件名后缀
   * @param {string} filename 文件名
   */
  getSuffix(filename) {
    return /\.([^.]+)$/.test(filename) ? RegExp.$1 : ''
  }
}

