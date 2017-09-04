import defaultConfiguration from '../assets/configuration'

window.OAX = window.OAX || {}

export const configuration = window.OAX.cfg = {
  ...defaultConfiguration,
  ...(window.OAX.cfg || {})
}
