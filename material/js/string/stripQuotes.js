/**
 * Strip quotes from a string
 *
 * @param {String} str
 * @return {String | false}
 */
export function stripQuotes(str) {
  var a = str.charCodeAt(0)
  var b = str.charCodeAt(str.length - 1)
  return a === b && (a === 0x22 || a === 0x27)
    ? str.slice(1, -1)
    : str
}