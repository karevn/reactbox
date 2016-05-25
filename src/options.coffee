deepmerge = require('deepmerge')
i18n = require('../src/i18n')
guessType = (url)->
  if url.match /\.(jpg|jpeg|png|gif|bmp|jfif|tif|jpe)$/i
    return 'image'
  if url.match /(youtube\.com|youtu\.be|vimeo\.com)/i
    return 'video'
  if url.match /\.(html?$|php$|google\.com\/maps\/embed)/i
    return 'iframe'
  return 'image'
module.exports = (options)->
  options = deepmerge({
    services: require('./share').services
    toolbar: {share: true}
    i18n: i18n
    activeIndex: 0,
    carousel: true
  }, options)
  options.items.forEach (item, index)->
    item.index = index
    item.type = if item.url then guessType(item.url) else 'image'
  options

module.exports.getDescriptionStyle = (item)->
  return 'none' unless item.description
  return 'none' unless item.description.title?.trim() or
    item.description.text?.trim()
  return 'bottom' if item.description.style == 'right' and
  window.innerWidth < 1024
  item.description.style || 'mini'
module.exports.getContentType = (item)->
  return item.type if item.type
  return 'html' if item.html
  'image'
module.exports.getCarousel = (prop)->
  return false unless prop.items.length > 1
  prop.carousel and window.innerWidth > 768
