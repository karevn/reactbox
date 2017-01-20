import fullscreen from './fullscreen'
import deeplink from './deeplink'

function prev(state) {
  if (state.activeIndex > 0) {
    state.activeIndex -= 1
  }
  deeplink.set(state.items[state.activeIndex])
}
function next(state) {
  if (state.activeIndex < state.items.length - 1) {
    state.activeIndex += 1
  }
  deeplink.set(state.items[state.activeIndex])
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
    state.touch.offset = {
      x: position.x - state.touch.start.x,
      y: position.y - state.touch.start.y
    }
  },
  'touch.end': function(state, position) {
    const threshold = window.innerWidth / 3
    if (state.touch && state.touch.offset) {
      const offset = state.touch.offset.x
      if (offset > threshold && state.activeIndex > 0) {
        prev(state)
      }
      if (offset < -threshold &&
      state.activeIndex < state.items.length - 1) {
        next(state)
      }
    }
    delete state.touch
  },
  'fullscreen.enter': function(state) {
    fullscreen.enter()
    state.toolbar.isFullscreen = true
  },
  'fullscreen.exit': function(state) {
    fullscreen.exit()
    state.toolbar.isFullscreen = false
  },
  'carousel.resize': function(state, size) {
    state.carousel = size
  }
}
