require('../../../../sass/content/iframe.sass')
React = require('react')
ReactDOM = require('react-dom')
classnames = require('classnames')

module.exports = React.createClass
  getInitialState: -> size: {width: 0, height: 0}
  getDefaultProps: ->
    full: true
    vAlign: true
    fitWidth: false
  componentDidMount: ->
    @updateSize()
    window.addEventListener 'resize', @updateSize
  updateSize: ->
    node = ReactDOM.findDOMNode(this)
    @setState size: {width: node.clientWidth, height: node.clientHeight}
  componentWillUnmount: ->
    window.removeEventListener 'resize', @updateSize
  getIframeStyle: (item)->
    imageAspect = 1280 / 720
    clientAspect = @state.size.width / @state.size.height
    if @props.full
      return {
        width: @state.size.width
        height: @state.size.height
      }
    if imageAspect > clientAspect || @props.fitWidth
      style = {
        width: @state.size.width
        height: height = Math.floor(@state.size.width / imageAspect)
      }
      if @props.vAlign
        style.top = (@state.size.height - height) / 2
      return style
    {
      height: @state.size.height
      width: width = @state.size.height * imageAspect
      left: (@state.size.width - width) / 2
    }

  render: ->
    <div className={classnames ['reactbox-lightbox-item-object',
      'reactbox-object-iframe',
      @props.className]}>
      <iframe src={@props.src}}
        style={@getIframeStyle(@props.item)}
        onLoad={ => @props.dispatch('item.load', @props.item)}/>
    </div>
