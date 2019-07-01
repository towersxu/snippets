/**
 * Converts hyphen/underscore/slash delimitered names into
 * camelized classNames.
 *
 * e.g. my-component => MyComponent
 *      some_else    => SomeElse
 *      some/comp    => SomeComp
 *
 * @param {String} str
 * @return {String}
 */

var classifyRE = /(?:^|[-_\/])(\w)/g
export function classify(str) {
  return str.replace(classifyRE, toUpper)
}

/**
 * Hyphenate a camelCase string.
 *
 *  e.g. MyComponent => my-component
 *      SomeEEElseEls    => some-eeelse-els
 * @param {String} str
 * @return {String}
 */

var hyphenateRE = /([a-z\d])([A-Z])/g
export function hyphenate(str) {
  return str
    .replace(hyphenateRE, '$1-$2')
    .toLowerCase()
}
