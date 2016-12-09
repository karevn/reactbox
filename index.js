
import options from './src/options'
import App from 'yaux/app'
import store from './src/store'
import Lightbox from './src/components'
import Keyboard from './src/keyboard'
import Touch from './src/touch'
import Deeplink from './src/deeplink'

function createWrapper() {
  const el = document.createElement('div')
  el.id = "reactbox-wrapper"
  document.body.appendChild(el)
  return el
}

export default function Reactbox (props) {
  const el = createWrapper()
  const unmount = props.onUnmount
  options.onUnmount = (component)=> {
    if (unmount){
      unmount(component)
    }
    ReactDOM.unmountComponentAtNode(el)
    el.remove()
  }
  const state = options(props)
  const app = new App(state, [store], el, Lightbox)
  const keyboard = Keyboard(app.store.dispatch)
  const touch = Touch(app.store.dispatch)
  Deeplink.init()
  Deeplink.set(app.store.state.items[app.store.state.activeIndex])
  keyboard.enable()
  touch.enable()
  app.store.dispatch('init')
  app.store.onDispatch = function(action, params) {
    if (action !== 'unmount') {
      return
    }
    keyboard.disable()
    deeplink.reset()
    fullscreen.exit()
    touch.disable()
  }
}
