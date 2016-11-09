require('../../../../sass/content/image.sass')
React = require('react')
ReactDOM = require('react-dom')
classnames = require('classnames')
getStyle = require '../style.coffee'
module.exports = React.createClass
  getInitialState: -> {width: 0, height: 0}
  componentDidMount: ->
    @updateSize()
    window.addEventListener 'resize', @updateSize
  updateSize: ->
    node = ReactDOM.findDOMNode(this)
    @setState width: node.clientWidth, height: node.clientHeight
  componentWillUnmount: ->
    window.removeEventListener 'resize', @updateSize
  getStyleFit: ->
    imageAspect = @props.item.size.width / @props.item.size.height
    clientAspect = @state.width / @state.height
    if imageAspect > clientAspect
      width: @state.width
      height: height = @state.width / imageAspect
      top: (@state.height - height) / 2
    else
      height: @state.height
      width: width = @state.height * imageAspect
      left: (@state.width - width) / 2
  getStyleFill: ->
    imageAspect = @props.item.size.width / @props.item.size.height
    clientAspect = @state.width / @state.height
    if imageAspect < clientAspect
      width: @state.width
      height: height = @state.width / imageAspect
      top: (@state.height - height) / 2
    else
      height: @state.height
      width: width = @state.height * imageAspect
      left: (@state.width - width) / 2
  getImageStyle: ->
    return unless @props.item.size
    return unless @state.height > 0
    if getStyle(@props.item) in ['none', 'mini']
      return @getStyleFit()
    return @getStyleFill()

  render: (props = @props)->
    <div className="reactbox-lightbox-item-object reactbox-object-image">
      <img className="reactbox-lightbox-content-image"
        style={@getImageStyle()}
        src={props.item.url}
        onLoad={(event)=>
          @props.item.size = {
            width: event.target.naturalWidth,
            height: event.target.naturalHeight
          }
          props.dispatch('item.load', @props.item)
        }
      />
    </div>
