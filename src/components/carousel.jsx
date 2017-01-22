import './carousel.sass'

import React from 'react'
import classnames from 'classnames'

import CloseIcon from 'react-icons/md/close'

import css from '../css'
import find from 'array.prototype.find'
import {get as property} from 'dot-prop'
import curry from 'curry'

function differs(a, b, props) {
  return find(props, (prop) => property(a, prop) !== property(b, prop))
}

const onClick = curry(function onClick(props, e) {
  e.preventDefault()
  props.dispatch('item.thumbnail.click', props.item)
})
const onError = curry(function onError(props, e) {
  props.dispatch('item.thumbnail.error', props.item)
})
const onLoad = curry(function onLoad(props, e) {
  props.item.thumbnailSize = {width: e.target.naturalWidth,
      height: e.target.naturalHeight}
  props.dispatch('item.thumbnail.load', props.item)
})
const onImageMounted = curry(function onImageMounted(props, image) {
  if (!image) {
    return
  }
  if (image.complete || props.item.thumbnailLoaded) {
    props.dispatch('item.thumbnail.load', props.item)
  }
})
function thumbnailTransform(props) {
  return {transform: translate(props.left, props.top)} }
function translate(x, y) {
  return `translate(${x}px, ${y || 0}px)` }
function Item (props) {
  const imageStyle = css.prefix(thumbnailTransform(props))
  const classes = classnames('reactbox-carousel-item', {
    'reactbox-active': props.item.index === props.activeIndex,
    'reactbox-loaded': props.item.thumbnailLoaded || props.item.thumbnailError,
    'reactbox-error': props.item.thumbnailError,
    'reactbox-animated': props.item.thumbnailLoaded || props.item.thumbnailError
  })
  return (
    <div className={classes} onClick={onClick(props)} style={imageStyle}>
      <If condition={!props.item.error}>
        <img src={props.item.thumbnail}
          onLoad={onLoad(props)}
          onError={onError(props)}
          />
      </If>
      <If condition={props.item.error}><CloseIcon /></If>
    </div>
  )
}

function getItemWidth(props, item) {
  if (!item.thumbnail || item.thumbnailError) {
      return 100
    }
  if (!item.thumbnailSize) {
    return 0
  }
  return props.carousel.height *
    item.thumbnailSize.width / item.thumbnailSize.height
}

function getLeftForActive (props) {
  return window.innerWidth / 2 -
    getItemWidth(props, props.items[props.activeIndex]) / 2
}

function visible(props) {
  const items = props.items
  const current = items[props.activeIndex]
  let left = getLeftForActive(props)
  const visible = [{item: current, left: left}]
  const windowWidth = window.innerWidth

  if (current.index < items.length - 1) {
    for (let i = current.index + 1; i < items.length; i++) {
      const item = items[i]
      left = left + getItemWidth(props, items[i - 1]) + 12
      visible.push({item: item, left: left})
      if (!(item.thumbnailSize &&
        (item.thumbnailLoaded || item.thumbnailError)) ||
        item.left > windowWidth * 1.5) {
        break
      }
    }
  }
  left = getLeftForActive(props)
  if (current.index > 0 && (current.thumbnailLoaded ||
    current.thumbnailError)) {
    for (let i = current.index - 1; i >= 0; i--) {
      const item = items[i]
      left = left - (getItemWidth(props, items[i])) - 12
      visible.unshift({item: item, left: left})
      if (!(item.thumbnailSize && (item.thumbnailLoaded || item.thumbnailError)) ||
        item.left < -(windowWidth + getItemWidth(props, item))) {
        break
      }
    }
  }
  return visible
}

export default class Carousel extends React.Component {
  constructor (props) {
    super(props)
    this.onWindowResize = ::this.onWindowResize
  }
  componentDidMount () {
    this.onWindowResize()
    window.addEventListener('resize', this.onWindowResize)
  }
  componentWillUnmount () {
    window.removeEventListener('resize', this.onWindowResize)
  }
  onWindowResize () {
    const node = this.refs.carousel
    this.props.dispatch('carousel.resize',
      {width: node.clientWidth, height: node.clientHeight})
  }
  render (props = this.props) {
    return (
      <div className="reactbox-carousel" ref="carousel">
        <If condition={props.carousel}>
          <For each="item" of={visible(props)}>
            <Item {...props} item={item.item} key={item.item.index}
              left={item.left}/>
          </For>
        </If>
      </div>
    )
  }
}
