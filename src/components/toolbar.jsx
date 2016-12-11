require('./toolbar.sass')
import React from 'react'
import fullscreen from '../fullscreen'
import ShareMenu from './share'

const hasFullscreen = fullscreen.supports()

function Tooltip (props) {return (
  <span className="reactbox-tooltip">{props.children}</span>)}

function Icon (props){ return (
  <i className={`reactbox-icon-${props.icon}`} />)}

export default class Toolbar extends React.Component {
  constructor (props) {
    super(props)
    this.state = {shareOpen: false}
    this.onWindowClickWhenSharing = ::this.onWindowClickWhenSharing
  }
  componentWillUpdate (newProps, newState) {
    if (newState.shareOpen && !this.state.shareOpen){
      window.addEventListener('click', this.onWindowClickWhenSharing, true)
    }
    if (!newState.shareOpen && this.state.shareOpen){
      window.removeEventListener('click', this.onWindowClickWhenSharing, true)
    }
  }

  componentWillUnmount () {
    if (this.state.shareOpen){
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
        <a href="#" onClick={(e)=> {e.preventDefault(); props.dispatch('unmount');}}
          className="reactbox-toolbar-close reactbox-toolbar-link">
          <Icon icon="close" />
        </a>
        <If condition={hasFullscreen && !props.toolbar.isFullscreen}>
          <a href="#" onClick={(e)=> {e.preventDefault(); props.dispatch('fullscreen.enter');}}
            className="reactbox-toolbar-fullscreen reactbox-toolbar-link">
            <Icon icon="fullscreen" />
            <span className="reactbox-tooltip">
              {props.i18n.toolbar.fullscreen.enter}
            </span>
          </a>
        </If>
        <If condition={hasFullscreen && props.toolbar.isFullscreen}>
          <a href="#"
            className="reactbox-toolbar-link reactbox-toolbar-exit-fullscreen"
            onClick={(e)=> {e.preventDefault(); props.dispatch('fullscreen.exit');}}>
            <Icon icon="exit-fullscreen" />
            <Tooltip>{props.i18n.toolbar.fullscreen.exit}</Tooltip>
          </a>
        </If>
        <If condition={activeItem && Object.keys(props.services).length > 0 &&
           props.toolbar.share}>
          <div className="reactbox-toolbar-link reactbox-toolbar-share">
            <i className="reactbox-icon-share"
              onClick={(e)=> {
                e.preventDefault();
                this.setState({'shareOpen': true});
                props.dispatch('share.open'); }}></i>
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
            <Icon icon="download" />
            <Tooltip>{props.i18n.toolbar.download}</Tooltip>
          </a>
        </If>
      </div>
    )
  }
}
