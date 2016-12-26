import './iframe.sass'

import React from 'react'
import ReactDOM from 'react-dom'
import classnames from 'classnames'

import {pixels} from '../../../css'

export default class Iframe extends React.Component {
  constructor (props) {
    super(props)
    this.state = {size: {width: 0, height: 0}}
    this.updateSize = ::this.updateSize
  }

  componentDidMount () {
    this.updateSize()
    window.addEventListener('resize', this.updateSize)
  }

  updateSize () {
    const node = ReactDOM.findDOMNode(this)
    this.setState({size: {width: node.clientWidth, height: node.clientHeight}})
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this.updateSize)
  }

  render (props = this.props) {
    return (
      <div className={classnames('reactbox-lightbox-item-object',
        'reactbox-object-iframe', props.className)}>
        <iframe src={props.src}
          style={pixels(this.state.size)}
          onLoad={() => props.dispatch('item.load', props.item)} />
      </div>
    )
  }
}
