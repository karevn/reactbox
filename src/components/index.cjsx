require('../../sass/reactbox.sass')
React = require('react')
ReactDOM = require('react-dom')

Toolbar = require('./toolbar')
Lightbox = require('./lightbox').default
Carousel = require('./carousel')
classnames = require('classnames')
options = require('../options').default
getCarouselOptions = require('../options').getCarousel
dispatch = require('yaux')
store = require('../store')
deeplink = require('../deeplink')
fullscreen = require('../fullscreen')

ReactBox = React.createClass
  getInitialState: -> width: window.innerWidth
  componentDidMount: ->
    window.addEventListener 'resize', @onWindowResize
  componentWillUnmount: ->
    window.removeEventListener 'resize', @onWindowResize
  onWindowResize: ->
    @setState width: window.innerWidth
  render: (prop = @props)->
    carousel = getCarouselOptions(prop)
    <div className={classnames ['reactbox'],
      'reactbox-horizontal': true
      'reactbox-has-carousel': carousel
      }>
      <Toolbar {...prop} />
      <Lightbox {...prop} />
      { if carousel
        <Carousel {... prop} />
      }
    </div>

module.exports = React.createClass
  getInitialState: -> options(@props)
  componentDidMount: ->
    @keyboard = require('../keyboard')(@dispatch)
    @touch = require('../touch')(@dispatch)
    deeplink.init()
    deeplink.set(@state.items[@state.activeIndex])
    @keyboard.enable()
    @touch.enable()
  componentWillUnmount: ->
    @keyboard.disable()
    @touch.disable()
    deeplink.reset()
    fullscreen.exit()
  dispatch: (action, params)->
    dispatch([], [store], @state, action, params, inPlace: true).then (state)=>
      if @isMounted(this) && action != 'unmount'
        @setState(state || @state)
      else if action == 'unmount' and @props.onUnmount
        @props.onUnmount(this)

  render: ->
    <ReactBox {...@state} dispatch={@dispatch} />
