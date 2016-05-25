camelcase = require 'uppercamelcase'
defaultPrefixes = ['moz', 'webkit', 'o', 'ms']
prefixedKeys = {
  'transform': defaultPrefixes
  'border-radius': defaultPrefixes
  'transition': defaultPrefixes
  'box-sizing': ['moz']
}
prefixedValues: {
  'display': ['flex']
}
module.exports =
  prefix: (styles)->
    Object.keys(styles).reduce( (result, key)->
      if prefixes = prefixedKeys[key]
        result = prefixes.reduce( (result, prefix)->
          result[camelcase(prefix + "-" + key)] = styles[key]
          result
        , result)
      result[key] = styles[key]
      result
    , {})
  camelize: (styles)->
    return styles
    Object.keys(styles).reduce(((result, key)->
      if key in prefixedKeys
        result[camelcase(key)] = styles[key]
      else
        result[key] = styles[key]
      return result
    ), {})
