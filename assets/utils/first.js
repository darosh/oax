export function first (obj) {
  if (obj) {
    const keys = Object.keys(obj)

    if (keys.length) {
      return keys[0]
    }
  }
}
