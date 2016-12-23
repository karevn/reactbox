
export default function(dispatch) {
  let onTouchStart = function(e) {
    if (e.target.closest(`.reactbox-toolbar-wrapper, .reactbox-prev, \
.reactbox-next`)) {
      return
    }
    return dispatch('touch.start', {x: e.touches[0].pageX, y: e.touches[0].pageY})
  }
  let onTouchEnd = function(e) {
    let original = e.changedTouches[0]
    if (original) {
      return dispatch('touch.end', {
        x: e.changedTouches[0].pageX,
        y: e.changedTouches[0].pageY}
      )
    }
  }
  let onTouchMove = function(e) {
    let touch = e.touches[0]
    return dispatch('touch.move', {
      x: touch.pageX,
      y: touch.pageY
    })
  }

  return {
    enable() {
      window.addEventListener('touchstart', onTouchStart)
      window.addEventListener('touchend', onTouchEnd)
      return window.addEventListener('touchmove', onTouchMove)
    },
    disable() {
      window.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('touchend', onTouchEnd)
      return window.removeEventListener('touchmove', onTouchMove)
    }
  }
}
