React = require('react')
Iframe = require('./iframe')
module.exports =
  image: require('./image')
  video: require('./video')
  ajax: require('./ajax')
  iframe: (props)-> <Iframe {...props} src={props.item.url} />
  html: require('./html')
