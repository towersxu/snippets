/**
 * 设置contenteditable元素聚焦光标位置
 * @see https://stackoverflow.com/questions/4233265/contenteditable-set-caret-at-the-end-of-the-text-cross-browser
 * @param {element} el 聚焦contenteditable
 */
function placeCaretAtEnd(el) {
  el.focus()
  if (typeof window.getSelection !== 'undefined' &&
    typeof document.createRange !== 'undefined') {
    let range = document.createRange()
    range.selectNodeContents(el)
    range.collapse(false)
    let sel = window.getSelection()
    sel.removeAllRanges()
    sel.addRange(range)
  } else if (typeof document.body.createTextRange !== 'undefined') {
    let textRange = document.body.createTextRange()
    textRange.moveToElementText(el)
    textRange.collapse(false)
    textRange.select()
  }
}
