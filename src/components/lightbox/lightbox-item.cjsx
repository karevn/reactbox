require('../../../sass/lightbox-item.sass')
React = require('react')
ReactDOM = require('react-dom')
Loading = require('../loading')
Description = require('./description.cjsx')
content = require('./content')
classnames = require('classnames')
options = require('../../options')
css = require '../../css'
getStyle = require './style'
module.exports = React.createClass
  getInitialState: -> {contentSize: {width: 0, height: 0}, loaded: false, lastActiveIndex: @props.activeIndex}
  calcStyle: ->
    offset = {x: 0, y: 0}
    if @props.touch?.offset
      offset = @props.touch.offset
    if @props.metrics and @props.item.index == @props.activeIndex
      return {
        transform: "translate(#{offset.x}px, 0)"
        left: 0
        top: 0
        width: @props.metrics.width + "px"
        height: @props.metrics.height + "px"
      }
    if @props.metrics and @props.item.index < @props.activeIndex
      return  {
        left: 0
        transform: "translate(#{(- @props.metrics.width + offset.x)}px, 0)"
        top: 0
        width: @props.metrics.width + "px"
        height: @props.metrics.height + "px"
      }
    if @props.metrics and @props.item.index > @props.activeIndex
      return {
        left: 0
        transform: "translate(#{@props.metrics.width + offset.x}px, 0)"
        top: 0
        width: @props.metrics.width + "px"
        height: @props.metrics.height + "px"
      }
  componentDidMount: ->
    @updateSize()
    window.addEventListener 'resize', @updateSize
  componentWillUnmount: ->
    window.removeEventListener 'resize', @updateSize
    @props.dispatch('item.unload', @props.item)
  updateSize: ->
    node = ReactDOM.findDOMNode(this)
    @setState(
      contentSize: {
        width: @refs.content.offsetWidth
        height: @refs.content.offsetHeight
      },
      size: {
        width: node.clientWidth
        height: node.clientHeight
      }
      )
  componentWillReceiveProps: (props)->
    @setState animated: Math.abs(props.activeIndex - @props.activeIndex) < 2
  getContentStyle: ->
    unless @refs.content
      return null
    offset = if options.getCarousel(@props) then 130 else 24
    if (@state.contentSize and
    getStyle(@props.item) == 'bottom' and
    @refs.content.offsetHeight < @state.size.height - offset)
      return {
        top: (@state.size.height - offset + 54 - @refs.content.offsetHeight) / 2
      }
  onResize: (size)-> @setState(contentSize: size)
  render: ->
    descriptionStyle = getStyle(@props.item)
    type = options.getContentType(@props.item)
    style = css.camelize(css.prefix(@calcStyle()))
    <div className={classnames ['reactbox-lightbox-item',
      "reactbox-description-#{descriptionStyle}",
      "reactbox-content-#{type}"
      {
        'reactbox-lightbox-active': @props.item.index == @props.activeIndex
        'reactbox-lightbox-next': @props.item.index == @props.activeIndex + 1
        'reactbox-lightbox-prev': @props.item.index == @props.activeIndex - 1
        'reactbox-loaded': @props.item.loaded
        'reactbox-animated': @state.animated
      }]} style={style}>
      <div className="reactbox-lightbox-item-content"
        style={@getContentStyle()}
        ref="content"
        >
        {React.createElement content[type],
          Object.assign({}, @props, {onResize: @onResize})}
        { if descriptionStyle != 'none'
          <Description {...@props} />
        }
      </div>
      { unless @props.item.loaded
        <Loading {...@props} />
      }
    </div>
