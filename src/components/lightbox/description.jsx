require('../../../sass/description.sass')
import React from 'react'
import classnames from 'classnames'

import Scrollbar from 'react-scrollbar'

import getStyle from './style'

export default class Description extends React.Component {
  shouldComponentUpdate () { return false }
  render (props = this.props) {
    const item = props.item
    const style = getStyle(item)
    return (
      <Scrollbar className={classnames('reactbox-lightbox-item-description',
        {'reactbox-description-light': style === 'right' &&
        item.type == 'video'})}
        speed={0.8}
        horizontal={false}
        contentClassName="reactbox-lightbox-item-description-inner">
        <If condition={!!item.description}>
          <div className="reactbox-lightbox-item-description-content"
            dangerouslySetInnerHTML={{__html: item.description}} />
        </If>
      </Scrollbar>
    )
  }
}
