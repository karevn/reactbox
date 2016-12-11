require('./index.sass')
import React from 'react'
import classnames from 'classnames'

import Toolbar from './toolbar'
import Lightbox from './lightbox'
import Carousel from './carousel'


import {getCarousel as getCarouselOptions} from '../options'

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
    const carousel = getCarouselOptions(props)
    return (
      <div className={classnames(['reactbox'], {
        'reactbox-horizontal': true, 'reactbox-has-carousel': carousel})}>
        <Toolbar {...props} />
        <Lightbox {...props} />
        <If condition={!!carousel}><Carousel {... props} />
        </If>
      </div>
    )
  }
}



