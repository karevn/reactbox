import './index.sass'

import classnames from 'classnames'

import React from 'react'
import ReactDOM from 'react-dom'

import Item from './lightbox-item'

import LeftIcon from 'react-icons/fa/angle-left'
import RightIcon from 'react-icons/fa/angle-right'

export default class Lightbox extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
  }
  componentDidMount () {
    window.addEventListener('resize', ::this.calcMetrics)
    this.calcMetrics()
  }
  componentWillUnmount () {
    window.removeEventListener('resize', ::this.calcMetrics)
  }
  calcMetrics () {
    const node = ReactDOM.findDOMNode(this)
    this.setState({
      metrics: {
        left: node.offsetLeft,
        top: node.offsetTop,
        width: node.clientWidth,
        height: node.clientHeight
      }
    })
  }
  render () {
    const _this = this
    const props = this.props
    const items = [props.items[props.activeIndex]]
    if (props.activeIndex > 0) {
      items.unshift(props.items[props.activeIndex - 1])
    }
    if (props.activeIndex < props.items.length - 1) {
      items.push(props.items[props.activeIndex + 1])
    }
    return (
      <div className="reactbox-lightbox">
        <If condition={this.props.items.length > 1}>
          <div className={classnames(['reactbox-prev'],
            {'reactbox-disabled': this.props.activeIndex == 0})}
            onClick={ ()=> {props.dispatch('prev')}}>
            <LeftIcon size={100}/>
          </div>
        </If>
        <If condition={props.items.length > 1}>
          <div className={classnames(['reactbox-next', {
            'reactbox-disabled': props.activeIndex >= props.items.length - 1
            }])} onClick={ () => {props.dispatch('next')}}>
            <RightIcon size={100}/>
          </div>
        </If>
        <If condition={this.state.metrics}>
            {items.map((item)=> {return (<Item {...props} item={item} metrics={this.state.metrics} key={item.index} />)})}
        </If>
      </div>
    )
  }
}
