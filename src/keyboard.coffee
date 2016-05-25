module.exports = (dispatch)->
  onKeyDown = (e)->
    if e.which == 27
      dispatch('unmount')
    if (e.which == 37 or e.which == 38)
      dispatch 'prev'
    if e.which == 40 or e.which == 39
      dispatch 'next'

  enable: ->
    window.addEventListener 'keydown', onKeyDown
  disable: ->
    window.removeEventListener 'keydown', onKeyDown
