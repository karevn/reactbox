require('../../sass/toolbar.sass')
import React from 'react'
import fullscreen from '../fullscreen'
import share from '../share'

const hasFullscreen = fullscreen.supports()

export default class Toolbar extends React.Component {
  constructor (props) {
    super(props)
    this.state = {shareOpen: false}
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
      <div className="reactbox-toolbar-wrapper">
        <div className="reactbox-toolbar">
          <div className="reactbox-toolbar-actions">
            <a href="#" onClick={(e)=> {e.preventDefault(); props.dispatch('unmount');}}
              className="reactbox-toolbar-close reactbox-toolbar-link">
              <i className="reactbox-icon-close" />
            </a>
            <If condition={hasFullscreen && !props.toolbar.isFullscreen}>
              <a href="#" onClick={(e)=> {e.preventDefault(); props.dispatch('fullscreen.enter');}}
                className="reactbox-toolbar-fullscreen reactbox-toolbar-link">
                <i className="reactbox-icon-fullscreen" />
                <span className="reactbox-tooltip">
                  {props.i18n.toolbar.fullscreen.enter}
                </span>
              </a>
            </If>
            <If condition={hasFullscreen && props.toolbar.isFullscreen}>
              <a href="#"
                className="reactbox-toolbar-link reactbox-toolbar-exit-fullscreen"
                onClick={(e)=> {e.preventDefault(); props.dispatch('fullscreen.exit');}}>
                <i className="reactbox-icon-exit-fullscreen" />
                <span className="reactbox-tooltip">
                  {props.i18n.toolbar.fullscreen.exit}</span>
              </a>
            </If>
            <If condition={activeItem && Object.keys(props.services).length > 0 &&
               props.toolbar.share}>
              <div className="reactbox-toolbar-share">
                <i className="reactbox-icon-share"
                  onClick={(e)=> {e.preventDefault();
                    this.setState('shareOpen': true); props.dispatch('share.open'); }}></i>
                <span className="reactbox-tooltip">
                  {props.i18n.toolbar.share}</span>
                <If condition={props.toolbar.shareActive}>
                  <div className="reactbox-share-menu">
                    { Object.keys(props.services).map((slug)=> {
                      const service = props.services[slug]
                      return (
                        <a target="_blank" className="reactbox-share-link"
                          key={slug}
                          onClick={(e)=> {e.preventDefault();
                            props.dispatch('share.close'); false}}
                          href={share.getShareUrl(service, activeItem)}>
                          <If condition={service.icon}>
                            <img src={service.icon} alt="" />
                          </If>
                          <If condition={!service.icon}>
                            <i className={"reactbox-icon-#{slug}"} />
                          </If>
                          {service.name}
                        </a>
                      )
                    })
                    }
                  </div>
                </If>
              </div>
            </If>
            <If condition={activeItem.download}>
              <a className="reactbox-toolbar-download reactbox-toolbar-link"
                download href={activeItem.download}
                target="_blank">
                <i className="reactbox-icon-download" />
                <span className="reactbox-tooltip">
                  {props.i18n.toolbar.download}</span>
              </a>
            </If>
          </div>
        </div>
      </div>
    )
  }
}
