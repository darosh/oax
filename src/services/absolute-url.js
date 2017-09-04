let a

export function absoluteUrl (url) {
  a = a || document.createElement('a')
  a.href = url

  return a.href
}
