import './ajax.sass'

import React from 'react'
const ajax = require('atomicjs')

export default class Ajax extends React.Component {
  constructor (props) {
    super(props)
    this.state = {html: ''}
    this.onAjaxLoaded = ::this.onAjaxLoaded
    this.onAjaxError = ::this.onAjaxError
  }

  componentDidMount () {
    ajax.get(this.props.item.url)
    .success(this.onAjaxLoaded).error(this.onAjaxError)
  }

  onAjaxError () {
    this.props.dispatch('item.error', this.props.item)
  }

  onAjaxLoaded (html) {
    this.setState({html})
    this.props.dispatch('item.load', this.props.item)
  }

  render () {
    return (
      <div className="reactbox-lightbox-item-object
        reactbox-lightbox-item-ajax-object"
        dangerouslySetInnerHTML={{__html: this.state.html}} />
    )
  }
}
