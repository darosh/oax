import { trim } from './md-converter'

export function md (obj, key = 'description') {
  const mkey = '_md_' + key

  if (!obj[mkey]) {
    obj[mkey] = trim(obj[key])
  }

  return obj[mkey]
}
