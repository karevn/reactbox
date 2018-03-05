import './lightbox-item.sass'

import React from 'react'
import ReactDOM from 'react-dom'
const classnames = require('classnames')

import Loading from '../loading'
import Description from './description'
import {getContentType, getCarousel} from '../../options'

import * as content from './content'
import css from '../../css'
import getStyle from './style'

function getOffset(props) {
  return props.touch && props.touch.offset ? props.touch.offset : {x: 0, y: 0}
}
function isActiveItem(item, props) {
  return item.index === props.activeIndex }
function isPreviousItem(item, props) {
  return item.index < props.activeIndex }
function isNextItem(item, props) {
  return item.index > props.activeIndex }
function getTransform (props) {
  const item = props.item
  const metrics = props.metrics
  const offset = getOffset(props)
  if (isActiveItem(props.item, props)) {
    return `translate(${offset.x}px, 0)`
  }
  if (isPreviousItem(item, props)) {
    return `translate(${(-metrics.width + offset.x)}px, 0)`
  }
  if (isNextItem(item, props)) {
    return `translate(${metrics.width + offset.x}px, 0)`
  }
}
export default class LightboxItem extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
    this.updateSize = ::this.updateSize
  }

  calcStyle () {
    const props = this.props
    const metrics = props.metrics
    if (!props.metrics) {
      return null
    }
    return {
      transform: getTransform(props),
      left: 0,
      top: 0,
      width: metrics.width + 'px',
      height: metrics.height + 'px'
    }
  }
  componentDidMount () {
    this.updateSize()
    window.addEventListener('resize', this.updateSize)
    const _ = jQuery || $
    _(window).trigger('lightbox:item:add', ReactDOM.findDOMNode(this))
  }
  componentWillUnmount () {
    window.removeEventListener('resize', this.updateSize)
    this.props.dispatch('item.unload', this.props.item)
    const _ = jQuery || $
    _(window).trigger('lightbox:item:remove', ReactDOM.findDOMNode(this))
  }
  updateSize () {
    const node = this.refs.this
    this.setState({
      size: {width: node.clientWidth, height: node.clientHeight}
    })
  }
  componentWillReceiveProps (props) {
    this.setState({
      animated: Math.abs(props.activeIndex - this.props.activeIndex) < 2 })
  }
  getContentStyle () {
    if (!this.refs.content) {
      return null
    }
    const offset = getCarousel(this.props) ? 130 : 24
    if (getStyle(this.props.item) === 'bottom' &&
      this.refs.content.offsetHeight < this.state.size.height - offset) {
      return { top: (this.state.size.height - offset + 54 -
        this.refs.content.offsetHeight) / 2 }
    }
  }
  render (props = this.props) {
    const item = props.item
    const descriptionStyle = getStyle(item)
    const type = getContentType(item)
    const style = css.prefix(this.calcStyle())
    return (
      <div className={classnames('reactbox-lightbox-item',
        `reactbox-description-${descriptionStyle}`,
        `reactbox-content-${type}`, {
          'reactbox-lightbox-active': isActiveItem(item, props),
          'reactbox-lightbox-next': isNextItem(item, props),
          'reactbox-lightbox-prev': isPreviousItem(item, props),
          'reactbox-loaded': item.loaded,
          'reactbox-animated': this.state.animated
        })} style={style} ref="this">
        <div className="reactbox-lightbox-item-content"
          style={this.getContentStyle()}
          ref="content">
          {React.createElement(content[type], props)}
          <If condition={descriptionStyle !== 'none'}>
            <Description {...props} /></If>
        </div>
        <If condition={!item.loaded}><Loading {...props} /></If>
      </div>
    )
  }

}
