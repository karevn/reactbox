require('../../../../sass/content/ajax.sass')
React = require('react')
classnames = require('classnames')
module.exports = React.createClass
  getInitialState: -> {html: ''}
  componentDidMount: ->
    fetch(@props.item.url).then(@onAjaxLoaded)
  onAjaxLoaded: (response)->
    @setState html: response
    @props.dispatch('item.load', @props.item)
  render: ->
    <div className="reactbox-lightbox-item-object
      reactbox-lightbox-item-ajax-object"
      dangerouslySetInnerHTML={__html: @state.html} />
