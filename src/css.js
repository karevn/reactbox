import camelcase from 'uppercamelcase';
let defaultPrefixes = ['moz', 'webkit', 'o', 'ms'];
let prefixedKeys = {
  'transform': defaultPrefixes,
  'border-radius': defaultPrefixes,
  'transition': defaultPrefixes,
  'box-sizing': ['moz']
};
({
  prefixedValues: {
    'display': ['flex']
  }
});
export default {
  prefix(styles){
    return Object.keys(styles).reduce( function(result, key){
      let prefixes;
      if (prefixes = prefixedKeys[key]) {
        result = prefixes.reduce( function(result, prefix){
          result[camelcase(prefix + "-" + key)] = styles[key];
          return result;
        }
        , result);
      }
      result[key] = styles[key];
      return result;
    }
    , {});
  },
  camelize(styles){
    return styles;
    return Object.keys(styles).reduce((function(result, key){
      if (prefixedKeys.includes(key)) {
        result[camelcase(key)] = styles[key];
      } else {
        result[key] = styles[key];
      }
      return result;
    }), {});
  }
};