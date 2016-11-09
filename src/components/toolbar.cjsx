require('../../sass/toolbar.sass')
fullscreen = require('../fullscreen')
share = require('../share')
hasFullscreen = fullscreen.supports()
React = require('react')
module.exports = React.createClass
  getInitialState: -> {shareOpen: false}
  componentWillUpdate: (newProps, newState)->
    if newState.shareOpen and !@state.shareOpen
      window.addEventListener 'click', @onWindowClickWhenSharing, true
    if !newState.shareOpen and @state.shareOpen
      window.removeEventListener 'click', @onWindowClickWhenSharing, true
  componentWillUnmount: ->
    if @state.shareOpen
      window.removeEventListener 'click', @onWindowClickWhenSharing, true
  onWindowClickWhenSharing: ->
    @props.dispatch('share.close')
  render: (prop = @props)->
    activeItem = prop.items[prop.activeIndex]
    <div className="reactbox-toolbar-wrapper">
      <div className="reactbox-toolbar">
        <div className="reactbox-toolbar-actions">
          <a href="#" onClick={-> prop.dispatch('unmount'); false}
            className="reactbox-toolbar-close reactbox-toolbar-link">
            <i className="reactbox-icon-close" />
          </a>
          { if hasFullscreen and !prop.toolbar.isFullscreen
            <a href="#" onClick={-> prop.dispatch('fullscreen.enter'); false}
              className="reactbox-toolbar-fullscreen reactbox-toolbar-link">
              <i className="reactbox-icon-fullscreen" />
              <span className="reactbox-tooltip">
                {prop.i18n.toolbar.fullscreen.enter}
              </span>
            </a>
          }
          { if hasFullscreen and prop.toolbar.isFullscreen
            <a href="#"
              className="reactbox-toolbar-link reactbox-toolbar-exit-fullscreen"
              onClick={-> prop.dispatch('fullscreen.exit'); false}>
              <i className="reactbox-icon-exit-fullscreen" />
              <span className="reactbox-tooltip">
                {prop.i18n.toolbar.fullscreen.exit}
              </span>
            </a>
          }
          { if activeItem and Object.keys(prop.services).length > 0 and prop.toolbar.share
            <div className="reactbox-toolbar-share">
              <i className="reactbox-icon-share"
                onClick={=> @setState('shareOpen': true); prop.dispatch('share.open'); false}></i>
              <span className="reactbox-tooltip">{prop.i18n.toolbar.share}</span>
              { if prop.toolbar.shareActive
                <div className="reactbox-share-menu">
                  { Object.keys(prop.services).map (slug)->
                    service = prop.services[slug]
                    <a target="_blank" className="reactbox-share-link"
                      key={slug}
                      onClick={-> prop.dispatch('share.close'); false}
                      href={share.getShareUrl(service, activeItem)}>
                      { if service.icon
                          <img src={service.icon} alt="" />
                        else
                          <i className={"reactbox-icon-#{slug}"} />
                      }
                      {service.name}
                    </a>
                  }
                </div>
              }
            </div>
          }
          { if activeItem.download
            <a className="reactbox-toolbar-download reactbox-toolbar-link"
              download href={activeItem.download}
              target="_blank">
              <i className="reactbox-icon-download" />
              <span className="reactbox-tooltip">{prop.i18n.toolbar.download}</span>
            </a>
          }
        </div>
      </div>
    </div>
