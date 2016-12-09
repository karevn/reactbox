function resize(container, content, decision) {
  const contentAspect = content.width / content.height
  const containerAspect = container.width / container.height
  const height = container.width / contentAspect
  const width = container.height * contentAspect
  if (decision(container, content)){
    return {
      width: container.width,
      height: height,
      top: (container.height - height) / 2,
    }
  } else return {
    height: container.height,
    width: width,
    left: (container.width - width) / 2,
  }
}

export function fit (container, content) {
  return resize(container, content, (container, content)=>container<content)
}

export function fill (container, content) {
  return resize(container, content, (container, content)=>container>content)
}
