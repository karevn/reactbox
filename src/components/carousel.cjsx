require('../../sass/carousel.sass')
React = require('react')
ReactDOM = require('react-dom')
classnames = require('classnames')
css = require '../css'

prefixStyles = (styles)->
  Object.keys(styles).reduce( (result, key)->
    if prefixes = prefixedKeys[key]
      result = prefixes.reduce( (result, prefix)->
        result["-#{prefix}-#{key}"] = styles[key]
      , result)
    result
  , {})
Item = React.createClass
  getInitialState: -> {
    animated: false
  }
  onLoad: (e)->
    @props.item.thumbnailSize = {
      width: e.target.naturalWidth
      height: e.target.naturalHeight
    }
    @props.dispatch('item.thumbnail.load', @props.item).then =>
      @setState(animated: true)
  onError: (e)-> @props.dispatch('item.thumbnail.error', @props.item)
  onClick: (e)->
    @props.dispatch('item.thumbnail.click', @props.item)
    false
  onImageMounted: (image)->
    return unless image
    if image.complete || @props.item.thumbnailLoaded
      @props.dispatch('item.thumbnail.load', @props.item)
  componentWillUnmount: ->
    @props.item.thumbnailLoaded = false
  render: ->
    imageStyle = css.camelize(css.prefix(transform: "translate(#{@props.left}px, 0)"))
    <div className={classnames ['reactbox-carousel-item', {
      'reactbox-active': @props.item.index == @props.activeIndex
      'reactbox-loaded': @props.item.thumbnailLoaded or @props.item.thumbnailError
      'reactbox-error': @props.item.thumbnailError
      'reactbox-animated': @state.animated
      }]}
      onClick={@onClick}
      style={imageStyle}>
      {
        unless @props.item.error
          <img src={@props.item.thumbnail}
            onLoad={@onLoad}
            onError={@onError}
            ref={@onImageMounted}
            />
        else
          <i className="reactbox-icon-close" />
      }
    </div>

Carousel = React.createClass
  getInitialState: -> {height: 0, width: 0}
  getWidth: (item)->
    return 100 if !item.thumbnail || item.thumbnailError
    return 0 unless item.thumbnailSize
    @state.height *
      item.thumbnailSize.width / item.thumbnailSize.height
  getLeftForActive: -> window.innerWidth / 2 -
    @getWidth(@props.items[@props.activeIndex]) / 2
  componentDidMount: ->
    @updateSize()
    window.addEventListener 'resize', @onWindowResize
  componentWillUnmount: ->
    window.removeEventListener 'resize', @onWindowResize
  onWindowResize: -> @updateSize()
  updateSize: ->
    node = ReactDOM.findDOMNode(this)
    @setState
      height: node.clientHeight
      width: node.clientWidth
  render: ->
    props = @props
    current = @props.items[@props.activeIndex]
    left = @getLeftForActive()
    visible = [{item: current, left: left}]
    if current.index < @props.items.length - 1
      for i in [current.index + 1 .. @props.items.length - 1]
        item = @props.items[i]
        left = left + @getWidth(@props.items[i - 1]) + 12
        visible.push
          item: item
          left: left
        if !(item.thumbnailSize && (item.thumbnailLoaded || item.thumbnailError)) or
        item.left > window.innerWidth * 1.5
          break
    left = @getLeftForActive()
    if current.index > 0
      for i in [current.index - 1 .. 0]
        item = @props.items[i]
        left = left - (width = @getWidth(@props.items[i])) - 12
        visible.unshift
          item: item
          left: left
        if !(item.thumbnailSize && (item.thumbnailLoaded || item.thumbnailError)) or
        item.left < - (window.innerWidth + @getWidth(item))
          break
    <div className="reactbox-carousel">
      { if @state.width and @state.height
          visible.map (item)->
            <Item {...props} item={item.item} key={item.item.index}
              left={item.left}/>
      }
    </div>
module.exports = Carousel
