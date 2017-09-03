import Vue from 'vue'
import { getColor } from 'random-material-color'

export const keys = {}

export function initKeys (APIS) {
  for (const k in keys) {
    if (keys[k] === '?') {
      keys[k] = (APIS.filter(v => v.url === k)[0] || {}).key
    }
  }
}

export function key (item) {
  if (this.keys[item.url]) {
    return this.keys[item.url]
  } else {
    const val = !this.APIS ? '?' : ((this.APIS.filter(
      v => v.url === item.url)[0] || {}).key || '')
    Vue.set(this.keys, item.url, val)

    return this.keys[item.url]
  }
}

export function color (item) {
  getColor({shades: ['400', '300'], text: key(item).split(':')[0]})
}
