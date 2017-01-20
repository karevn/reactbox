
export default function(dispatch) {
  const onTouchStart = function(e) {
    if (e.target.closest(`.reactbox-toolbar-wrapper, .reactbox-prev, \
.reactbox-next`)) {
      return
    }
    const touch = e.touches[0]
    return dispatch('touch.start', {x: touch.pageX, y: touch.pageY})
  }
  const onTouchEnd = function(e) {
    const original = e.changedTouches[0]
    if (original) {
      return dispatch('touch.end', {
        x: e.changedTouches[0].pageX,
        y: e.changedTouches[0].pageY}
      )
    }
  }
  const onTouchMove = function(e) {
    const touch = e.touches[0]
    return dispatch('touch.move', {
      x: touch.pageX,
      y: touch.pageY
    })
  }

  return {
    enable() {
      window.addEventListener('touchstart', onTouchStart)
      window.addEventListener('touchend', onTouchEnd)
      window.addEventListener('touchmove', onTouchMove)
    },
    disable() {
      window.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('touchend', onTouchEnd)
      window.removeEventListener('touchmove', onTouchMove)
    }
  }
}
