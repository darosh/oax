import {Converter} from 'showdown'

const converter = new Converter()
converter.setFlavor('github')

export function md (obj, key = 'description') {
  if (!obj['_md_' + key]) {
    obj['_md_' + key] = converter.makeHtml(obj[key])
  }

  return obj['_md_' + key]
}
