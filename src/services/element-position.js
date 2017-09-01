// Based on https://github.com/usablica/intro.js/blob/master/intro.js

export default function (element) {
  const elementPosition = {}

  const body = document.body
  const docEl = document.documentElement

  const scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop
  const scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft

  if (element instanceof SVGElement) {
    const x = element.getBoundingClientRect()

    elementPosition.top = x.top + scrollTop
    elementPosition.width = x.width
    elementPosition.height = x.height
    elementPosition.left = x.left + scrollLeft
  } else {
    // set width
    elementPosition.width = element.offsetWidth

    // set height
    elementPosition.height = element.offsetHeight

    // calculate element top and left
    let _x = 0
    let _y = 0

    while (element && !isNaN(element.offsetLeft) && !isNaN(element.offsetTop)) {
      _x += element.offsetLeft
      _y += element.offsetTop
      element = element.offsetParent
    }

    // set top
    elementPosition.top = _y
    // set left
    elementPosition.left = _x
  }

  elementPosition.cy = elementPosition.top += elementPosition.height / 2
  elementPosition.cx = elementPosition.left += elementPosition.width / 2

  return elementPosition
}
