require('../../../../sass/content/html.sass')
React = require('react')

module.exports = React.createClass
  componentDidMount: -> @props.dispatch('item.load', @props.item)
  render: (props = @props)->
    <div
      className="reactbox-lightbox-item-object reactbox-lightbox-item-html-object"
      dangerouslySetInnerHTML={__html: props.item.html}
    />
