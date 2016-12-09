import React from 'react'
import Iframe from './iframe'

export image from './image'
export video from './video'
export ajax from './ajax'
export html from './html'
export function iframe (props){
  return (<Iframe {...props} src={props.item.url} />)}

