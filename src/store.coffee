fullscreen = require('./fullscreen').default
deeplink = require('./deeplink').default

module.exports =
  'share.open': (state)->
    state.toolbar.shareActive = true
  'share.close': (state)->
    state.toolbar.shareActive = false
  'next': (state)->
    state.activeIndex += 1 if state.activeIndex < state.items.length - 1
    deeplink.set(state.items[state.activeIndex])
  'prev': (state)->
    state.activeIndex -=1 if state.activeIndex > 0
    deeplink.set(state.items[state.activeIndex])
  'item.thumbnail.click': (state, item)->
    state.activeIndex = item.index
    deeplink.set(state.items[state.activeIndex])

  'item.load': (state, item)->
    item.loaded = true
  'item.unload': (state, item)->
    item.loaded = false

  'item.thumbnail.load': (state, item)->
    item.thumbnailLoaded = true
  'item.thumbnail.error': (state, item)->
    item.thumbnailError = true

  'touch.start': (state, position)->
    state.touch = {
      start: position
    }
  'touch.move': (state, position)->
    threshold = 45
    state.touch.offset = {
      x: position.x - state.touch.start.x
      y: position.y - state.touch.start.y
    }
    if state.touch.offset.x > threshold and state.activeIndex > 0
      state.touch.start = position
      return @prev(state)
    if state.touch.offset.x < -threshold and
    state.activeIndex < state.items.length - 1
      state.touch.start = position
      return @next(state)
  'touch.end': (state, position)->
    delete state.touch
  'fullscreen.enter': (state)->
    fullscreen.enter()
    state.toolbar.isFullscreen = true
  'fullscreen.exit': (state)->
    fullscreen.exit()
    state.toolbar.isFullscreen = false
