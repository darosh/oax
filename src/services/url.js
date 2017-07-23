import buildURL from 'axios/lib/helpers/buildURL'

export default function url (config) {
  return buildURL(config.url, config.params)
}
