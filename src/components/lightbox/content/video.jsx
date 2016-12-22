require('./video.sass')
import React from 'react'
import ReactDOM from 'react-dom'
import Iframe from './iframe'
import getStyle from '../style'
import {fit, align} from './resize'

function load(tag, id, srcAttr, srcVal){
  return new Promise((resolve, reject)=>{
    let el = document.getElementById(id)
    if (el) {
      el.addEventListener('load', resolve)
      resolve()
    }
    el = document.createElement(tag)
    el.id = id
    el[srcAttr] = srcVal
    if (attr) {
      Object.keys(attr).forEach((key)=>{
        el.setAttribute(key, attr[key])
      })
    }
    document.head.appendChild(el)
    el.addEventListener('load', resolve)
    el.addEventListener('error', reject)
  })
}

function applyIf(condition, callback, value) {
  if (condition) {
    return callback(value)
  }
  return value
}

const tests = {
  youtube: /(.*(\(\/\/)?(www\.)?youtube\.com\/watch\?v=)|(.*(\/\/)?(www\.)?youtu\.be\/.*)|((https?:)?(\/\/)?(www\.)?youtube\.com\/embed\/)/,
  vimeo: /(https?:)?(\/\/)?(www\.)?vimeo\.com\/\d+/,
  mp4: /\.mp4$/,
}

const extractors = {
  youtube: function (url) {
    let regex
    if (url.match(regex = /.*(\(\/\/)?(www\.)?youtube\.com\/watch\?v=/)){
      return url.replace(regex, '')
    }
    if (url.match(regex = /.*(\/\/)?(www\.)?youtu\.be\//)){
      return url.replace(regex, '')
    }
    return url.replace(/(https?:)?(\/\/)?(www\.)?youtube\.com\/embed\//, '')
  },
  vimeo: function (url) {
    return url.replace(/(https?:)?(\/\/)?(www\.)?vimeo\.com\//, '')
  },
  mp4: function (url) { return url }
}

const formatters = {
  youtube: (id)=>`https://youtube.com/embed/${id}`,
  vimeo: (id)=>`https://player.vimeo.com/video/${id}`,
  mp4: (id)=>id,
}

function getSrc (item) {
  const url = item.url
  const service = Object.keys(tests).find((key)=> url.match(tests[key]))
  const id = extractors[service](url)
  return formatters[service](id)
}

function IframeVideo (props) {
  return (<Iframe {...props} src={getSrc(props.item)} full={false}
    className="reactbox-object-video"
    vAlign={getStyle(props.item) !== 'right'}
    fitWidth={getStyle(props.item) === 'bottom'}/>)
}
function loadVideoJS (callback) {
  return Promise.all(load('script', 'reactbox-video-js-loader', 'src',
    'https://cdnjs.cloudflare.com/ajax/libs/video.js/5.10.7/video.js'),
  load('link', 'reactbox-video-js-css', 'href',
    'https://cdnjs.cloudflare.com/ajax/libs/video.js/5.10.7/video-js.min.css',
    {rel: 'stylesheet'}))
}


class VideoJSVideo extends React.Component {
  constructor (props) {
    super(props)
    this.state = {size: {width: 0, height: 0}}
    this.onResize = ::this.onResize
  }
  componentDidMount () {
    const props = this.props
    loadVideoJS().then(()=> {
      props.dispatch('item.load', props.item).then(()=>{
        this.updateSize(()=> {
          window.addEventListener('resize', this.onResize)
          loadVideoJS().then(()=> {
            props.dispatch('item.load', props.item)
            const player = videojs(this.getVideoId())
            player.ready(()=>this.setState({player: player}))
           })
        })
      })
    })
  }

  updateSize (callback) {
    const node = ReactDOM.findDOMNode(this).parentElement
    this.setState({
      size: {
        width: node.clientWidth,
        height: node.clientHeight
      }
    }, callback)
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this.onResize)
    if (this.state.player){
      this.state.player.dispose()
    }
  }

  onResize () {this.updateSize()}

  getVideoId () {return `reactbox-video-${this.props.item.index}`}

  getIframeStyle (item) {
    const content = {width: 1280, height: 720}
    const container = this.state.size
    return container
    return applyIf(this.props.vAlign, align, fit(content, container))
  }

  render (props = this.props) {
    const item = props.item
    const iframeStyle = this.getIframeStyle(item)
    return (
      <div className="video-js-wrapper" style={iframeStyle}>
        <video id={this.getVideoId()} controls preload="auto"
          poster={item.thumbnail}
          style={{width: '100%', height: '100%'}}
          className="video-js">
          <source src={item.url} />
        </video>
      </div>
    )
  }
}

export default function Video (props) {
  if (props.item.url.match(tests.mp4))
    return (<VideoJSVideo {...props} />)
  else
    return (<IframeVideo {...props} />)
}
