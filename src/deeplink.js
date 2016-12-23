/* global location */
let hash = null
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
        location.hash = ''
      }
    } catch (error) {}
    hash = null
  }
}
