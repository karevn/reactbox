import './share.sass'

import React from 'react'
const classnames = require('classnames')
import {getShareUrl} from '../share'

export default function ShareMenu(props) {
  return (
    <div className={classnames('reactbox-share-menu',
      {'reactbox-share-menu--open': props.open})}>
      { Object.keys(props.services).map(slug => {
        const service = props.services[slug]
        return (
          <a target="_blank" className="reactbox-share-link"
            key={slug}
            onClick={e => {
              e.preventDefault()
              props.dispatch('share.close')
            }}
            href={getShareUrl(service, props.activeItem)}>
            <If condition={service.icon}>
              <img src={service.icon} alt="" />
            </If>
            <If condition={!service.icon && !!service.component}>
              { React.createElement(service.component) }
            </If>
            {service.name}
          </a>
        )
      })
      }
    </div>
  )
}
