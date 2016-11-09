require('../../../../sass/content/ajax.sass')
React = require('react')
classnames = require('classnames')
ajax = require 'atomicjs'
module.exports = React.createClass
  getInitialState: -> {html: ''}
  componentDidMount: ->
    ajax.get(@props.item.url).success(@onAjaxLoaded).error(@onAjaxError)
  onAjaxError: (error)->
    @props.dispatch('item.error', @props.item)
  onAjaxLoaded: (response)->
    @setState html: response.data
    @props.dispatch('item.load', @props.item)
  render: ->
    <div className="reactbox-lightbox-item-object
      reactbox-lightbox-item-ajax-object"
      dangerouslySetInnerHTML={__html: @state.html} />
