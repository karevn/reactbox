import './index.sass'
import '../../sass/black/index.sass'
import '../../sass/white/index.sass'
import React from 'react'
import classnames from 'classnames'

import Toolbar from './toolbar'
import Lightbox from './lightbox'
import Carousel from './carousel'

import {getCarousel as getCarouselOptions} from '../options'

const getReactboxClasses = (props) => classnames('reactbox', {
  'reactbox-horizontal': true,
  'reactbox-has-carousel': getCarouselOptions(props),
}, `reactbox--theme-${props.theme}`)
export default class Reactbox extends React.Component {
  constructor (props) {
    super(props)
    this.state = {width: window.innerWidth}
    this.onWindowResize = ::this.onWindowResize
  }
  componentDidMount () {
    window.addEventListener('resize', this.onWindowResize)
  }
  componentWillUnmount () {
    window.removeEventListener('resize', this.onWindowResize)
  }
  onWindowResize () {
    this.setState({width: window.innerWidth})
  }
  render (props = this.props) {
    return (
      <div className={getReactboxClasses(props)}>
        <Toolbar {...props} />
        <Lightbox {...props} />
        <If condition={!!getCarouselOptions(props)}>
          <Carousel {... props} />
        </If>
      </div>
    )
  }
}
