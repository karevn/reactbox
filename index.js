import ReactDOM from 'react-dom'

import options from './src/options'
import App from 'yaux/app'
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
  return options[prop+'s']
}
function createWrapper(options) {
  const el = document.createElement('div')
  el.id = "reactbox-wrapper"
  let extraClasses
  if (extraClasses = propOrProps('extraClass', options)){
    extraClasses.forEach((klass)=>el.classList.add(klass))
  }
  document.body.appendChild(el)
  return el
}

export default function Reactbox (props) {
  return new Promise((resolve, reject)=>{
    const el = createWrapper(props)
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
      Deeplink.reset()
      Fullscreen.exit()
      touch.disable()
      options.onUnmount()
      resolve(app.store.state.items[app.store.state.activeIndex])
    }
  })
}
