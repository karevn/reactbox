require('../../../../sass/content/video.sass')
require('video.js/dist/video-js.css')
React = require('react')
ReactDOM = require('react-dom')
Iframe = require('./iframe')
getStyle = require('../style').default
tests =
  youtube: /(.*(\(\/\/)?(www\.)?youtube\.com\/watch\?v=)|(.*(\/\/)?(www\.)?youtu\.be\/.*)|((https?:)?(\/\/)?(www\.)?youtube\.com\/embed\/)/
  vimeo: /(https?:)?(\/\/)?(www\.)?vimeo\.com\/\d+/
  mp4: /\.mp4$/
extractors =
  youtube: (url)->
    if url.match regex = /.*(\(\/\/)?(www\.)?youtube\.com\/watch\?v=/
      return url.replace regex, ''
    if url.match regex = /.*(\/\/)?(www\.)?youtu\.be\//
      return url.replace regex ''
    return url.replace /(https?:)?(\/\/)?(www\.)?youtube\.com\/embed\//, ''
  vimeo: (url)->
    url.replace /(https?:)?(\/\/)?(www\.)?vimeo\.com\//, ''
  mp4: (url)-> url

formatters =
  youtube: (id)-> "https://youtube.com/embed/#{id}"
  vimeo: (id)-> "https://player.vimeo.com/video/#{id}"
  mp4: (id)-> id
getSrc = (item)->
  url = item.url
  service = Object.keys(tests).find (key)-> url.match tests[key]
  id = extractors[service](url)
  formatters[service](id)
IframeVideo = (props) ->
  <Iframe {...props} src={getSrc(props.item)} full={false}
    className="reactbox-object-video"
    vAlign={getStyle(props.item) != 'right'}
    fitWidth={getStyle(props.item) == 'bottom'}/>

loadVideoJS = (callback)->
  callback() unless (typeof videojs) == 'undefined'
  unless script = document.getElementById 'reactbox-video-js-loader'
    script = document.createElement 'script'
    script.id = 'reactbox-video-js-loader'
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/video.js/5.10.7/video.js'
    document.body.appendChild(script)
  script.addEventListener 'load', callback



VideoJSVideo = React.createClass
  getInitialState: -> size: {
    width: 0
    height: 0
  }
  componentDidMount: ->
    loadVideoJS =>
      @props.dispatch('item.load', @props.item).then =>
        @updateSize =>
          window.addEventListener 'resize', @onResize
          loadVideoJS =>
            @props.dispatch('item.load', @props.item)
            player = videojs(@getVideoId())
            player.ready =>
            @setState
              player: player

  updateSize: (callback)->
    node = ReactDOM.findDOMNode(this)
    @setState({size: {width: node.parentElement.clientWidth, height: node.parentElement.clientHeight}}, callback)

  componentWillUnmount: ->
    window.removeEventListener 'resize', @onResize
    @state.player.dispose() if @state.player

  onResize: -> @updateSize()

  getVideoId: -> "reactbox-video-#{this.props.item.index}"

  getIframeStyle: (item)->
    imageAspect = 1280 / 720
    clientAspect = @state.size.width / @state.size.height
    if @props.full
      return {
        width: @state.size.width
        height: @state.size.height
      }
    if imageAspect > clientAspect || @props.fitWidth
      style = {
        width: @state.size.width
        height: height = Math.floor(@state.size.width / imageAspect)
      }
      if @props.vAlign
        style.top = (@state.size.height - height) / 2
      return style
    {
      height: @state.size.height
      width: width = @state.size.height * imageAspect
      left: (@state.size.width - width) / 2
    }

  render: ->
    iframeStyle = this.getIframeStyle(this.props.item)
    <div className="video-js-wrapper" style={iframeStyle}>
      <video id={@getVideoId()} controls preload="auto" poster={this.props.item.thumbnail}
        style={width: '100%', height: '100%'}
        className="video-js" >
        <source src={this.props.item.url} />
      </video>
    </div>

module.exports = (props)->
  if props.item.url.match(tests.mp4)
    <VideoJSVideo {...props} />
  else
    <IframeVideo {...props} />
