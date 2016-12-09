require('../../sass/reactbox.sass')
React = require('react')
ReactDOM = require('react-dom')

Toolbar = require('./toolbar')
Lightbox = require('./lightbox').default
Carousel = require('./carousel')
classnames = require('classnames')
options = require('../options').default
getCarouselOptions = require('../options').getCarousel

module.exports = React.createClass
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
