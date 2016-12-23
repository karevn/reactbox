import fullscreen from './fullscreen'
import deeplink from './deeplink'

function prev(state) {
  if (state.activeIndex > 0) { state.activeIndex -= 1 }
  return deeplink.set(state.items[state.activeIndex])
}
function next(state) {
  if (state.activeIndex < state.items.length - 1) { state.activeIndex += 1 }
  return deeplink.set(state.items[state.activeIndex])
}
function getItem(state, item) {
  return state.items[item.index]
}
export default {
  'share.open': function (state) {
    state.toolbar.shareActive = true
  },
  'share.close': function(state) {
    state.toolbar.shareActive = false
  },
  next: next,
  prev: prev,
  'item.thumbnail.click': function(state, item) {
    state.activeIndex = item.index
    deeplink.set(state.items[state.activeIndex])
  },
  'item.load': function(state, item) {
    getItem(state, item).loaded = true
  },
  'item.unload': function(state, item) {
    getItem(state, item).loaded = false
  },

  'item.thumbnail.load': function(state, item) {
    getItem(state, item).thumbnailLoaded = true
  },
  'item.thumbnail.error': function(state, item) {
    getItem(state, item).thumbnailError = true
  },

  'touch.start': function(state, position) {
    state.touch = {
      start: position
    }
  },
  'touch.move': function(state, position) {
    let threshold = 120
    state.touch.offset = {
      x: position.x - state.touch.start.x,
      y: position.y - state.touch.start.y
    }
    if (state.touch.offset.x > threshold && state.activeIndex > 0) {
      state.touch.start = position
      state.touch.offset = {x: 0, y: 0}
      prev(state)
      return
    }
    if (state.touch.offset.x < -threshold &&
    state.activeIndex < state.items.length - 1) {
      state.touch.start = position
      state.touch.offset = {x: 0, y: 0}
      next(state)
      return
    }
  },
  'touch.end': function(state, position) {
    delete state.touch
  },
  'fullscreen.enter': function(state) {
    fullscreen.enter()
    state.toolbar.isFullscreen = true
  },
  'fullscreen.exit': function(state) {
    fullscreen.exit()
    state.toolbar.isFullscreen = false
  }
}
