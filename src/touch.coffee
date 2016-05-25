
module.exports = (dispatch)->
  onTouchStart = (e)->
    if e.target.closest('.reactbox-toolbar-wrapper, .reactbox-prev,
      .reactbox-next')
      return
    dispatch('touch.start', x: e.touches[0].pageX, y: e.touches[0].pageY)
  onTouchEnd = (e)->
    original = e.changedTouches[0]
    if original
      dispatch('touch.end', {
        x: e.changedTouches[0].pageX,
        y: e.changedTouches[0].pageY}
      )
  onTouchMove = (e)->
    touch = e.touches[0]
    dispatch('touch.move', {
      x: touch.pageX
      y: touch.pageY
    })

  enable: ->
    window.addEventListener 'touchstart', onTouchStart
    window.addEventListener 'touchend', onTouchEnd
    window.addEventListener 'touchmove', onTouchMove
  disable: ->
    window.removeEventListener 'touchstart', onTouchStart
    window.removeEventListener 'touchend', onTouchEnd
    window.removeEventListener 'touchmove', onTouchMove
