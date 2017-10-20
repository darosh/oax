import defaultConfiguration from '../assets/configuration'

window.OAX = window.OAX || {}

export const configuration = window.OAX.cfg = {
  ...defaultConfiguration,
  ...(window.OAX.cfg || {}),
  ...{
    components: {
      stats: process.OAX_STATS,
      methods: process.OAX_METHODS,
      headers: process.OAX_HEADERS,
      statuses: process.OAX_STATUSES,
      editor: process.OAX_EDITOR
    }
  }
}
