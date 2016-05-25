prefix = (prop)->
  ['moz', 'ms', 'webkit'].map (prefix)-> "#{prefix}#{prop}"
module.exports =
  supports:  ->
    el = document.documentElement
    return true if el.requestFullscreen
    for prefixed in prefix('RequestFullScreen')
      return true if el[prefixed]
    false
  is: ->
    for method in ['fullscreenEnabled', 'webkitFullscreenEnabled',
        'mozFullscreenEnabled', 'msFullscreenEnabled']
      return document[method] if document[method]
    null
  enter: (el)->
    el = document.documentElement unless el
    method = el.requestFullScreen || el.webkitRequestFullScreen ||
      el.mozRequestFullScreen || el.msRequestFullScreen
    method.apply(el)
  exit: ->
    el = document.documentElement
    method = el.exitFullscreen || el.mozCancelFullScreen ||
      el.msExitFullscreen
    method.apply(el) if method
    if document.webkitExitFullscreen
      document.webkitExitFullscreen()
