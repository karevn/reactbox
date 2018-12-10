function pageToXY(touch) {
  return { x: touch.pageX, y: touch.pageY };
}
const onTouchStart = dispatch => e => {
  if (
    e.target.closest(`.reactbox-toolbar-wrapper, .reactbox-prev, \
.reactbox-next`)
  ) {
    return;
  }
  return dispatch("touch.start", pageToXY(e.touches[0]));
};

const onTouchEnd = dispatch => e => {
  const original = e.changedTouches[0];
  if (original) {
    dispatch("touch.end", pageToXY(e.changedTouches[0]));
  }
};

const onTouchMove = dispatch => e => {
  const touch = e.touches[0];
  dispatch("touch.move", pageToXY(touch));
};

export default dispatch => ({
  enable() {
    window.addEventListener("touchstart", onTouchStart(dispatch));
    window.addEventListener("touchend", onTouchEnd(dispatch));
    window.addEventListener("touchmove", onTouchMove(dispatch));
  },
  disable() {
    window.removeEventListener("touchstart", onTouchStart(dispatch));
    window.removeEventListener("touchend", onTouchEnd(dispatch));
    window.removeEventListener("touchmove", onTouchMove(dispatch));
  }
});
