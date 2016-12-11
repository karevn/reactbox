require('./lightbox-item.sass')

import React from 'react'
import ReactDOM from 'react-dom'
import classnames from 'classnames'

import Loading from '../loading'
import Description from './description'
import {getContentType, getCarousel} from '../..//options'

import * as content from './content'
import css from '../../css'
import getStyle from './style'

export default class LightboxItem extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      contentSize: {width: 0, height: 0},
      loaded: false,
      lastActiveIndex: props.activeIndex
    }
    this.updateSize = ::this.updateSize
  }
  calcStyle () {
    const props = this.props
    let offset = {x: 0, y: 0}
    if (props.touch && props.touch.offset){
      offset = props.touch.offset
    }
    if (props.metrics && props.item.index === props.activeIndex) {
      return {
        transform: `translate(${offset.x}px, 0)`,
        left: 0,
        top: 0,
        width: props.metrics.width + "px",
        height: props.metrics.height + "px",
      }
    }
    if (props.metrics && props.item.index < props.activeIndex){
      return  {
        left: 0,
        transform: `translate(${(- this.props.metrics.width + offset.x)}px, 0)`,
        top: 0,
        width: props.metrics.width + "px",
        height: props.metrics.height + "px",
      }
    }
    if (props.metrics && props.item.index > props.activeIndex) {
      return {
        left: 0,
        transform: `translate(${props.metrics.width + offset.x}px, 0)`,
        top: 0,
        width: props.metrics.width + "px",
        height: props.metrics.height + "px",
      }
    }
  }
  componentDidMount () {
    this.updateSize()
    window.addEventListener('resize', this.updateSize)
  }
  componentWillUnmount () {
    window.removeEventListener('resize', this.updateSize)
    this.props.dispatch('item.unload', this.props.item)
  }
  updateSize () {
    const node = ReactDOM.findDOMNode(this)
    this.setState({
      contentSize: { width: this.refs.content.offsetWidth,
        height: this.refs.content.offsetHeight},
      size: {width: node.clientWidth, height: node.clientHeight}
    })
  }
  componentWillReceiveProps (props) {
    this.setState({
      animated: Math.abs(props.activeIndex - this.props.activeIndex) < 2 })
  }
  getContentStyle () {
    if (!this.refs.content)
      return null
    const offset = getCarousel(this.props) ? 130 : 24
    if (this.state.contentSize && getStyle(this.props.item) == 'bottom' &&
      this.refs.content.offsetHeight < this.state.size.height - offset) {
      return { top: (this.state.size.height - offset + 54 -
        this.refs.content.offsetHeight) / 2 }
    }
  }
  onResize (size){ this.setState({contentSize: size}) }
  render (props = this.props) {
    const descriptionStyle = getStyle(this.props.item)
    const type = getContentType(this.props.item)
    const style = css.camelize(css.prefix(this.calcStyle()))
    return (
      <div className={classnames('reactbox-lightbox-item',
        `reactbox-description-${descriptionStyle}`,
        `reactbox-content-${type}`,
        {
          'reactbox-lightbox-active': this.props.item.index == this.props.activeIndex,
          'reactbox-lightbox-next': this.props.item.index == this.props.activeIndex + 1,
          'reactbox-lightbox-prev': this.props.item.index == this.props.activeIndex - 1,
          'reactbox-loaded': this.props.item.loaded,
          'reactbox-animated': this.state.animated,
        })} style={style}>
        <div className="reactbox-lightbox-item-content"
          style={this.getContentStyle()}
          ref="content">
          {React.createElement(content[type], Object.assign({}, props,
            {onResize: this.onResize}))}
          <If condition={descriptionStyle != 'none'}>
            <Description {...props} /></If>
        </div>
        <If condition={!props.item.loaded}><Loading {...props} /></If>
      </div>
    )
  }

}



