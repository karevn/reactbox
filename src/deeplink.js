/* global location */
let hash = null
function clearHash() {
  if ( window.history && window.history.pushState ) {
      window.history.pushState('', '', window.location.pathname)
  } else {
      window.location.href = window.location.href.replace(/#.*$/, '#');
  }
}
export default {
  init() {
    if (location.hash) {
      hash = location.hash
    }
  },
  set(item) {
    try {
      if (item.hash) {
        location.hash = item.hash
      } else {
        location.hash = hash || ''
      }
    } catch (error) {}
  },
  reset() {
    try {
      if (hash) {
        location.hash = hash
      } else {
        clearHash()
      }
    } catch (error) {}
    hash = null
  }
}
