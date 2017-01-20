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
    this.calcMetrics = ::this.calcMetrics
  }
  componentDidMount () {
    window.addEventListener('resize', this.calcMetrics)
    this.calcMetrics()
  }
  componentWillUnmount () {
    window.removeEventListener('resize', this.calcMetrics)
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
    const props = this.props
    const metrics = this.state.metrics
    const items = [props.items[props.activeIndex]]
    if (props.activeIndex > 0) {
      items.unshift(props.items[props.activeIndex - 1])
    }
    if (props.activeIndex < props.items.length - 1) {
      items.push(props.items[props.activeIndex + 1])
    }
    const prevClasses = classnames(['reactbox-prev'],
      {'reactbox-disabled': this.props.activeIndex === 0})
    const nextClasses = classnames(['reactbox-next',
      {'reactbox-disabled': props.activeIndex >= props.items.length - 1}])
    return (
      <div className="reactbox-lightbox">
        <If condition={props.items.length > 1}>
          <div className={prevClasses}
            onClick={() => props.dispatch('prev')}>
            <LeftIcon size={100}/>
          </div>
        </If>
        <If condition={props.items.length > 1}>
          <div className={nextClasses}
            onClick={() => props.dispatch('next')}>
            <RightIcon size={100}/>
          </div>
        </If>
        <If condition={!!metrics}>
          <For each="item" of={items}>
            <Item {...props} item={item} metrics={metrics}
              key={item.index} />
          </For>
        </If>
      </div>
    )
  }
}
