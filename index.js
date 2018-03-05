import ReactDOM from 'react-dom'

import options from './src/options'
import App from 'yaux/lib/app'
import store from './src/store'
import Lightbox from './src/components'
import Keyboard from './src/keyboard'
import Touch from './src/touch'
import Deeplink from './src/deeplink'
import Fullscreen from './src/fullscreen'

function propOrProps(prop, options) {
  if (options[prop]) {
    return [options[prop]]
  }
  return options[prop + 's']
}
function isThenable(obj) { return typeof obj.then === 'function' }
function createWrapper(options) {
  const el = document.createElement('div')
  el.id = 'reactbox-wrapper'
  const extraClasses = propOrProps('extraClass', options)
  if (extraClasses) {
    extraClasses.forEach(klass => el.classList.add(klass))
  }
  return el
}

export default function Reactbox (props) {
  return new Promise((resolve, reject) => {
    function show(props) {
      const el = createWrapper(props)
      document.body.appendChild(el)
      const overflow = document.documentElement.style.overflow
      document.documentElement.style.overflow = 'hidden'
      const state = options(props)
      const app = new App(state, [store], el, Lightbox)
      const keyboard = Keyboard(app.store.dispatch)
      const touch = Touch(app.store.dispatch)
      const unmount = props.onUnmount
      options.onUnmount = component => {
        document.documentElement.style.overflow = overflow
        keyboard.disable()
        Deeplink.reset()
        Fullscreen.exit()
        touch.disable()
        if (unmount) {
          unmount(component)
        }
        ReactDOM.unmountComponentAtNode(el)
        el.parentNode.removeChild(el)
      }
      Deeplink.init()
      Deeplink.set(app.store.state.items[app.store.state.activeIndex])
      keyboard.enable()
      touch.enable()
      app.store.dispatch('init')
      app.store.onDispatch = function(action, params) {
        if (action !== 'unmount') {
          return
        }
        options.onUnmount()
        resolve(app.store.state.items[app.store.state.activeIndex])
      }
    }
    if (isThenable(props)) {
      props.then(show)
    } else {
      show(props)
    }
  })
}
