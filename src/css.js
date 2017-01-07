import camelcase from 'uppercamelcase'
import includes from 'lodash/includes'

const defaultPrefixes = ['moz', 'webkit', 'o', 'ms']
const prefixedKeys = {
  'transform': defaultPrefixes,
  'border-radius': defaultPrefixes,
  'transition': defaultPrefixes,
  'box-sizing': ['moz']
};
({
  prefixedValues: {
    'display': ['flex']
  }
})
function mapObject(object, callback) {
  if (!object) {
    return object
  }
  return Object.keys(object).reduce((result, key) => {
    result[key] = callback(object[key], key, object)
    return result
  }, {})
}
function concatWith(suffix) { return function(str) { return str + suffix } }
export function pixels(style) { return mapObject(style, concatWith('px')) }
export default {
  prefix(styles) {
    return Object.keys(styles).reduce(function(result, key) {
      let prefixes = prefixedKeys[key]
      if (prefixes) {
        result = prefixes.reduce(function(result, prefix) {
          result[camelcase(prefix + '-' + key)] = styles[key]
          return result
        }
        , result)
      }
      result[key] = styles[key]
      return result
    }
    , {})
  },
  camelize(styles) {
    return Object.keys(styles).reduce(function(result, key) {
      if (includes(Object.keys(prefixedKeys),key)) {
        result[camelcase(key)] = styles[key]
      } else {
        result[key] = styles[key]
      }
      return result
    }, {})
  }
}
