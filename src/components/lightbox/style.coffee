module.exports = (item)->
  return 'none' unless item.description and item.description.trim()
  return 'bottom' if item.descriptionStyle == 'right' and window.innerWidth < 1024
  item.descriptionStyle || 'mini'
