require('./html.sass')
import React from 'react'

export default class Html extends React.Component {
  componentDidMount () { this.props.dispatch('item.load', this.props.item) }
  render (props = this.props) {
    return (
      <div
        className="reactbox-lightbox-item-object reactbox-lightbox-item-html-object"
        dangerouslySetInnerHTML={{__html: props.item.html}} />
    )
  }
}

