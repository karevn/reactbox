import i18n from '../src/i18n'
import {services} from './share'

function guessType(url) {
  if (url.match(/\.(jpg|jpeg|png|gif|bmp|jfif|tif|jpe)$/i)) {
    return 'image'
  }
  if (url.match(/(youtube\.com|youtu\.be|vimeo\.com|\.mp4$)/i)) {
    return 'video'
  }
  if (url.match(/\.(html?$|php$|google\.com\/maps\/embed)/i)) {
    return 'iframe'
  }
  return 'image'
};

export default function(options) {
  options = {
    services: services,
    toolbar: {share: true},
    i18n,
    activeIndex: 0,
    carousel: true,
    theme: 'black',
    ...options
  }
  options.items.forEach(function(item, index) {
    item.index = index
    if (!item.type) {
      item.type = item.url ? guessType(item.url) : 'image'
    }
  })
  return options
}

export function getContentType(item) {
  if (item.type) { return item.type }
  if (item.html) { return 'html' }
  return 'image'
}
export function getCarousel(prop) {
  if (prop.items.length <= 1) {
    return false
  }
  return prop.carousel && window.innerWidth > 768
}
