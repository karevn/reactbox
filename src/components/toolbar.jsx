import './toolbar.sass'

import React from 'react'
import fullscreen from '../fullscreen'
import ShareMenu from './share'

import DownloadIcon from 'react-icons/md/attach-file'
import CloseIcon from 'react-icons/md/close'
import FullScreenIcon from 'react-icons/md/fullscreen'
import FullScreenExitIcon from 'react-icons/md/fullscreen-exit'
import ShareIcon from 'react-icons/md/share'

const hasFullscreen = fullscreen.supports()

function Tooltip (props) {
  return (<span className="reactbox-tooltip">{props.children}</span>)
}

export default class Toolbar extends React.Component {
  constructor (props) {
    super(props)
    this.state = {shareOpen: false}
    this.onWindowClickWhenSharing = ::this.onWindowClickWhenSharing
  }
  componentWillUpdate (newProps, newState) {
    if (newState.shareOpen && !this.state.shareOpen) {
      window.addEventListener('click', this.onWindowClickWhenSharing, true)
    }
    if (!newState.shareOpen && this.state.shareOpen) {
      window.removeEventListener('click', this.onWindowClickWhenSharing, true)
    }
  }

  componentWillUnmount () {
    if (this.state.shareOpen) {
      window.removeEventListener('click', this.onWindowClickWhenSharing, true)
    }
  }

  onWindowClickWhenSharing () {
    this.props.dispatch('share.close')
  }

  render (props = this.props) {
    const activeItem = props.items[props.activeIndex]
    return (
      <div className="reactbox-toolbar">
        <a href="#"
          onClick={e => { e.preventDefault(); props.dispatch('unmount') }}
          className="reactbox-toolbar-close reactbox-toolbar-link">
          <CloseIcon />
        </a>
        <If condition={hasFullscreen && !props.toolbar.isFullscreen}>
          <a href="#"
            onClick={ e => {
              e.preventDefault()
              props.dispatch('fullscreen.enter')
            }}
            className="reactbox-toolbar-fullscreen reactbox-toolbar-link">
            <FullScreenIcon />
            <span className="reactbox-tooltip">
              {props.i18n.toolbar.fullscreen.enter}
            </span>
          </a>
        </If>
        <If condition={hasFullscreen && props.toolbar.isFullscreen}>
          <a href="#"
            className="reactbox-toolbar-link reactbox-toolbar-exit-fullscreen"
            onClick={e => {
              e.preventDefault()
              props.dispatch('fullscreen.exit')
            }}>
            <FullScreenExitIcon />
            <Tooltip>{props.i18n.toolbar.fullscreen.exit}</Tooltip>
          </a>
        </If>
        <If condition={activeItem && Object.keys(props.services).length > 0 &&
           props.toolbar.share}>
          <div className="reactbox-toolbar-link reactbox-toolbar-share">
            <ShareIcon
              onClick={e => {
                e.preventDefault()
                this.setState({'shareOpen': true})
                props.dispatch('share.open')
              }} />
            <Tooltip>{props.i18n.toolbar.share}</Tooltip>
            <If condition={props.toolbar.shareActive}>
              <ShareMenu dispatch={props.dispatch} open={this.state.shareOpen}
                services={props.services} activeItem={activeItem} />
            </If>
          </div>
        </If>
        <If condition={activeItem.download}>
          <a className="reactbox-toolbar-download reactbox-toolbar-link"
            download href={activeItem.download}
            target="_blank">
            <DownloadIcon />
            <Tooltip>{props.i18n.toolbar.download}</Tooltip>
          </a>
        </If>
      </div>
    )
  }
}
