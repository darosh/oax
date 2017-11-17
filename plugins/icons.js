import * as icons from './icons-bundle'

if (typeof window !== 'undefined') {
  window.$icons = Object.freeze(icons)
} else {
  global.$icons = Object.freeze(icons)
}
