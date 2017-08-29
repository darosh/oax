export function first (obj) {
  if (obj) {
    const keys = Object.keys(obj)

    if (keys.length) {
      return keys[0]
    }
  }
}

let a

export function absoluteUrl (url) {
  a = a || document.createElement('a')
  a.href = url

  return a.href
}
