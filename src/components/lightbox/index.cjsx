require('../../../sass/lightbox.sass')
classnames = require('classnames')

React = require('react')
ReactDOM = require('react-dom')
Item = require('./lightbox-item')
module.exports = React.createClass
  getInitialState: -> {}
  componentDidMount: ->
    window.addEventListener 'resize', @calcMetrics
    @calcMetrics()
  componentWillUnmount: ->
    window.removeEventListener 'resize', @calcMetrics
  calcMetrics: ->
    node = ReactDOM.findDOMNode(this)
    @setState metrics: {
      left: node.offsetLeft
      top: node.offsetTop
      width: node.clientWidth
      height: node.clientHeight
    }
  render: (props = @props)->
    items = [@props.items[@props.activeIndex]]
    if @props.activeIndex > 0
      items.unshift(@props.items[@props.activeIndex - 1])
    if @props.activeIndex < @props.items.length - 1
      items.push(@props.items[@props.activeIndex + 1])
    _this = this
    <div className="reactbox-lightbox">
      { if @props.items.length > 1
        <div className={classnames ['reactbox-prev'],
          'reactbox-disabled': @props.activeIndex == 0}]}
          onClick={-> props.dispatch('prev')}><i /></div>
      }
      { if @props.items.length > 1
        <div className={classnames ['reactbox-next', {
          'reactbox-disabled': @props.activeIndex >= @props.items.length - 1
          }]} onClick={-> props.dispatch('next')}><i /></div>
      }
      { if @state.metrics
        items.map (item)=> <Item {...@props} item={item}
          key={item.index} metrics={@state.metrics} />
      }
    </div>
