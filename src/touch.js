function pageToXY(touch) {return {x: touch.pageX, y: touch.pageY}}
export default function(dispatch) {
  const onTouchStart = function(e) {
    if (e.target.closest(`.reactbox-toolbar-wrapper, .reactbox-prev, \
.reactbox-next`)) {
      return
    }
    return dispatch('touch.start', pageToXY(e.touches[0]));
  }
  const onTouchEnd = function(e) {
    const original = e.changedTouches[0]
    if (original) {
      dispatch('touch.end', pageToXY(e.changedTouches[0]))
    }
  }
  const onTouchMove = function(e) {
    const touch = e.touches[0]
    dispatch('touch.move', pageToXY(touch))
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
