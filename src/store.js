import fullscreen from './fullscreen';
import deeplink from './deeplink';
export default {
  ['share.open'](state){
    return state.toolbar.shareActive = true;
  },
  ['share.close'](state){
    return state.toolbar.shareActive = false;
  },
  ['next'](state){
    if (state.activeIndex < state.items.length - 1) { state.activeIndex += 1; }
    return deeplink.set(state.items[state.activeIndex]);
  },
  ['prev'](state){
    if (state.activeIndex > 0) { state.activeIndex -=1; }
    return deeplink.set(state.items[state.activeIndex]);
  },
  ['item.thumbnail.click'](state, item){
    state.activeIndex = item.index;
    return deeplink.set(state.items[state.activeIndex]);
  },

  ['item.load'](state, item){
    return item.loaded = true;
  },
  ['item.unload'](state, item){
    return item.loaded = false;
  },

  ['item.thumbnail.load'](state, item){
    return item.thumbnailLoaded = true;
  },
  ['item.thumbnail.error'](state, item){
    return item.thumbnailError = true;
  },

  ['touch.start'](state, position){
    return state.touch = {
      start: position
    };
  },
  ['touch.move'](state, position){
    let threshold = 45;
    state.touch.offset = {
      x: position.x - state.touch.start.x,
      y: position.y - state.touch.start.y
    };
    if (state.touch.offset.x > threshold && state.activeIndex > 0) {
      state.touch.start = position;
      return this.prev(state);
    }
    if (state.touch.offset.x < -threshold &&
    state.activeIndex < state.items.length - 1) {
      state.touch.start = position;
      return this.next(state);
    }
  },
  ['touch.end'](state, position){
    return delete state.touch;
  },
  ['fullscreen.enter'](state){
    fullscreen.enter();
    return state.toolbar.isFullscreen = true;
  },
  ['fullscreen.exit'](state){
    fullscreen.exit();
    return state.toolbar.isFullscreen = false;
  }
};
