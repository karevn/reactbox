require('../../../../sass/content/video.sass')
React = require('react')
Iframe = require('./iframe')
options = require('../../../options')
tests =
  youtube: /(.*(\(\/\/)?(www\.)?youtube\.com\/watch\?v=)|(.*(\/\/)?(www\.)?youtu\.be\/.*)|((https?:)?(\/\/)?(www\.)?youtube\.com\/embed\/)/
  vimeo: /(https?:)?(\/\/)?(www\.)?vimeo\.com\/\d+/
extractors =
  youtube: (url)->
    if url.match regex = /.*(\(\/\/)?(www\.)?youtube\.com\/watch\?v=/
      return url.replace regex, ''
    if url.match regex = /.*(\/\/)?(www\.)?youtu\.be\//
      return url.replace regex ''
    return url.replace /(https?:)?(\/\/)?(www\.)?youtube\.com\/embed\//, ''
  vimeo: (url)->
    url.replace /(https?:)?(\/\/)?(www\.)?vimeo\.com\//, ''
formatters =
  youtube: (id)-> "//youtube.com/embed/#{id}"
  vimeo: (id)-> "//player.vimeo.com/video/#{id}"
getSrc = (item)->
  url = item.url
  service = Object.keys(tests).find (key)-> url.match tests[key]
  id = extractors[service](url)
  formatters[service](id)
module.exports = (props)->
  <Iframe {...props} src={getSrc(props.item)} full={false}
    className="reactbox-object-video"
    vAlign={options.getDescriptionStyle(props.item) != 'right'}
    fitWidth={options.getDescriptionStyle(props.item) == 'bottom'}/>
