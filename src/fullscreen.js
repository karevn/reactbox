let prefix = prop => ['moz', 'ms', 'webkit'].map(prefix => `${prefix}${prop}`)
export default {
  supports() {
    let el = document.documentElement
    if (el.requestFullscreen) { return true }
    return !!prefix('RequestFullScreen').find(prefixed => !!el[prefixed])
  },
  is() {
    for (let method of ['fullscreenEnabled', 'webkitFullscreenEnabled',
      'mozFullscreenEnabled', 'msFullscreenEnabled']) {
      if (document[method]) {
        return document[method]
      }
    }
    return null
  },
  enter(el) {
    if (!el) { el = document.documentElement }
    let method = el.requestFullScreen || el.webkitRequestFullScreen ||
      el.mozRequestFullScreen || el.msRequestFullScreen
    return method.apply(el)
  },
  exit() {
    let el = document.documentElement
    let method = el.exitFullscreen || el.mozCancelFullScreen ||
      el.msExitFullscreen
    if (method) { method.apply(el) }
    if (document.webkitExitFullscreen) {
      return document.webkitExitFullscreen()
    }
  }
}
