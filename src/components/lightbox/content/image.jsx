require('./image.sass')
import React from 'react'
import ReactDOM from 'react-dom'
import classnames from 'classnames'
import getStyle from '../style'
import {fit, fill, align} from './resize'
import {pixels} from '../../../css'

export default class Image extends React.Component {
  constructor (props) {
    super(props)
    this.state = {width: 0, height: 0}
    this.updateSize = ::this.updateSize
  }

  componentDidMount () {
    this.updateSize()
    window.addEventListener('resize', this.updateSize)
  }
  updateSize () {
    const node = ReactDOM.findDOMNode(this)
    this.setState({width: node.clientWidth, height: node.clientHeight})
  }
  componentWillUnmount () {
    window.removeEventListener('resize', this.updateSize)
  }

  getImageStyle () {
    if (!this.props.item.size || this.state.height == 0)
      return
    if (['none', 'mini'].includes(getStyle(this.props.item))){
      return fit(this.state, this.props.item.size)
    }
    return fill(this.state, this.props.item.size)
  }

  render (props = this.props) {
    return (
      <div className="reactbox-lightbox-item-object reactbox-object-image">
      <img className="reactbox-lightbox-content-image"
        style={pixels(align(this.state, this.getImageStyle()))}
        src={props.item.url}
        onLoad={(event)=> {
          props.item.size = {
            width: event.target.naturalWidth,
            height: event.target.naturalHeight
          }
          props.dispatch('item.load', props.item)
        }}
      />
    </div>
    )
  }
}
