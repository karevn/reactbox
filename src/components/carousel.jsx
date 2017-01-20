import './carousel.sass'

import React from 'react'
import classnames from 'classnames'

import CloseIcon from 'react-icons/md/close'

import css from '../css'
import find from 'array.prototype.find'
import {get as property} from 'dot-prop'

function differs(a, b, props) {
  return find(props, (prop) => property(a, prop) !== property(b, prop))
}

class Item extends React.Component {
  constructor (props) {
    super(props)
    this.onImageMounted = ::this.onImageMounted
    this.onClick = ::this.onClick
    this.onError = ::this.onError
    this.onLoad = ::this.onLoad
  }
  onLoad (e) {
    this.props.item.thumbnailSize = {width: e.target.naturalWidth,
      height: e.target.naturalHeight}
    this.props.dispatch('item.thumbnail.load', this.props.item)
  }
  onError (e) {
    this.props.dispatch('item.thumbnail.error', this.props.item)
  }
  onClick (e) {
    e.preventDefault()
    this.props.dispatch('item.thumbnail.click', this.props.item)
  }
  onImageMounted (image) {
    if (!image) {
      return
    }
    if (image.complete || this.props.item.thumbnailLoaded) {
      this.props.dispatch('item.thumbnail.load', this.props.item)
    }
  }
  componentWillUnmount () {
    this.props.item.thumbnailLoaded = false
  }

  render (props = this.props) {
    const imageStyle =
      css.prefix({transform: `translate(${props.left}px, 0)`})
    const classes = classnames('reactbox-carousel-item', {
      'reactbox-active': props.item.index === props.activeIndex,
      'reactbox-loaded': props.item.thumbnailLoaded || props.item.thumbnailError,
      'reactbox-error': props.item.thumbnailError,
      'reactbox-animated': props.item.thumbnailLoaded || props.item.thumbnailError
    })
    return (
      <div className={classes} onClick={this.onClick} style={imageStyle}>
        <If condition={!props.item.error}>
          <img src={props.item.thumbnail}
            onLoad={this.onLoad}
            onError={this.onError}
            ref={this.onImageMounted} />
        </If>
        <If condition={props.item.error}><CloseIcon /></If>
      </div>
    )
  }
}

export default class Carousel extends React.Component {
  constructor (props) {
    super(props)
    this.onWindowResize = ::this.onWindowResize
  }
  getWidth (item) {
    if (!item.thumbnail || item.thumbnailError) {
      return 100
    }
    if (!item.thumbnailSize) {
      return 0
    }
    return this.props.carousel.height *
      item.thumbnailSize.width / item.thumbnailSize.height
  }
  getLeftForActive () {
    return window.innerWidth / 2 -
      this.getWidth(this.props.items[this.props.activeIndex]) / 2
  }
  componentDidMount () {
    this.updateSize()
    window.addEventListener('resize', this.onWindowResize)
  }
  componentWillUnmount () {
    window.removeEventListener('resize', this.onWindowResize)
  }
  onWindowResize () { this.updateSize() }
  updateSize () {
    const node = this.refs.carousel
    this.props.dispatch('carousel.resize',
      {width: node.clientWidth, height: node.clientHeight})
  }
  render (props = this.props) {
    const current = props.items[props.activeIndex]
    let left = this.getLeftForActive()
    const visible = [{item: current, left: left}]
    if (current.index < this.props.items.length - 1) {
      for (let i = current.index + 1; i < this.props.items.length; i++) {
        const item = props.items[i]
        left = left + this.getWidth(props.items[i - 1]) + 12
        visible.push({item: item, left: left})
        if (!(item.thumbnailSize &&
          (item.thumbnailLoaded || item.thumbnailError)) ||
          item.left > window.innerWidth * 1.5) {
          break
        }
      }
    }
    left = this.getLeftForActive()
    if (current.index > 0 && (current.thumbnailLoaded ||
      current.thumbnailError)) {
      for (let i = current.index - 1; i >= 0; i--) {
        const item = this.props.items[i]
        left = left - (this.getWidth(this.props.items[i])) - 12
        visible.unshift({item: item, left: left})
        if (!(item.thumbnailSize && (item.thumbnailLoaded || item.thumbnailError)) ||
          item.left < -(window.innerWidth + this.getWidth(item))) {
          break
        }
      }
    }
    return (
      <div className="reactbox-carousel" ref="carousel">
        <If condition={props.carousel}>
          <For each="item" of={visible}>
            <Item {...props} item={item.item} key={item.item.index}
              left={item.left}/>
          </For>
        </If>
      </div>
    )
  }
}
